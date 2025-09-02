import { CustomLogoComponent } from "@/shared/assets/logos/settings/CustomLogoComponent";
import { hidePhoneNumber } from "@/shared/util/phone-formatter";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaScreenComponent } from "../../../../shared/components/ui";
import { SignInType } from "../AuthFormScreen/api";
import { onAuth, resendOtp } from "./api";

interface OtpScreenProps {
  phoneNumber: string;
  selectedAuthMethod: SignInType;
}

export default function OtpScreen({ phoneNumber, selectedAuthMethod }: OtpScreenProps) {
  const { t } = useTranslation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(59);
  // const { verifyOTP } = useAuth();
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit only when all fields are filled
    if (newOtp.every((digit) => digit.trim() !== "")) {
      handleVerifyOTP(newOtp.join(""));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async (otpString?: string) => {
    const code = otpString || otp.join("").trim();

    if (code.length !== 6) {
      Alert.alert(t("auth:error"), t("auth:enterFullCode"));
      return;
    }

    setIsLoading(true);

    try {
      const isValid = await onAuth(phoneNumber, code);
      if (isValid) {
        router.replace("/(protected)/main" as any);
      } else {
        Alert.alert(t("auth:error"), t("auth:invalidCodeTryAgain"));
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      Alert.alert(t("auth:error"), t("auth:somethingWrong"));
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);

    try {
      await resendOtp(phoneNumber, selectedAuthMethod);
      setCountdown(59);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // Alert.alert(t("auth:success"), t("auth:newCodeSent"));
    } catch (error) {
      // Alert.alert(t("auth:error"), t("auth:failedToResendCode"));
      throw error;
    } finally {
      setIsResending(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaScreenComponent>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <CustomLogoComponent name="light" width={170} height={45} />
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={24} color="#111827" />
            </TouchableOpacity>

            <Text style={styles.title}>
              {t("auth:otpSentTo", { phoneNumber: hidePhoneNumber(phoneNumber) })}
            </Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null,
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                  placeholder="-"
                  editable={!isLoading && !isResending}
                />
              ))}
            </View>

            {/* Loading indicator when auto-submitting */}
            {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6366f1" />
                <Text style={styles.loadingText}>
                  {t("auth:verifyingCode")}
                </Text>
              </View>
            )}

            {/* Resending indicator */}
            {/* {isResending && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#6366f1" />
                <Text style={styles.loadingText}>
                  {t("auth:sendingNewCode")}
                </Text>
              </View>
            )} */}

            {/* Countdown and Resend */}
            <View style={styles.resendContainer}>
              {countdown > 0 ? (
                <Text style={styles.countdown}>
                  {t("auth:requestNewCode")}{" "}
                  {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                  {String(countdown % 60).padStart(2, "0")}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={isResending}
                  style={styles.resendButton}
                >
                  <Text style={styles.resendButtonText}>
                    {t("auth:resendCode")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: "30%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6366f1",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 20,
    color: "#111827",
    lineHeight: 24,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6366f1",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  otpInput: {
    width: 45,
    height: 56,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  otpInputFilled: {
    borderColor: "#6366f1",
    backgroundColor: "#f0f8ff",
  },
  resendContainer: {
    alignItems: "center",
  },
  countdown: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    color: "#6366f1",
    marginTop: 8,
  },
});