import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { CustomLogoComponent } from "@/shared/assets/logos/settings/CustomLogoComponent";
import { formatPhoneNumber } from "@/shared/util/phone-formatter";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SigninMethod } from "../../../../../constants/SigninMethod";
import { SafeAreaScreenComponent } from "../../../../shared/components/ui";
import { PhoneInput } from "../../components/PhoneInput";
import { signIn, SignInType } from "./api";

export default function AuthFormScreen() {
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [countryCode, setCountryCode] = useState<string>('');

  const handleSendOTP = async ({ phoneNumber, selectedAuthMethod }: { phoneNumber: string, selectedAuthMethod: SignInType }) => {
    if (!acceptedTerms) {
      setShowTermsError(true);
      throw new Error('Terms not accepted');
    }
    await signIn(phoneNumber, selectedAuthMethod as SignInType);
  };

  const mutation = useMutation({
    mutationFn: ({ phoneNumber, selectedAuthMethod }: { phoneNumber: string, selectedAuthMethod: SignInType }) => handleSendOTP({ phoneNumber, selectedAuthMethod }),
    onSuccess: () => {
      router.push({
        pathname: "/(auth)/otp",
        params: { phoneNumber: formatPhoneNumber(phoneNumber, countryCode), selectedAuthMethod }
      });
    },
    onError: (error: any) => {
      if (error.message === 'Terms not accepted') {
        return;
      }
      Alert.alert(t("auth:error"), t("auth:enterPhone"));
    }
  });

  const defaultMethod = SigninMethod.find(method => method.isActive)?.name || SigninMethod[0]?.name;
  const [selectedAuthMethod, setSelectedAuthMethod] = useState<string>(defaultMethod);

  const handleMethodSelect = (methodName: string) => {
    setSelectedAuthMethod(methodName);
  };

  return (
    <SafeAreaScreenComponent>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <CustomLogoComponent name="light" width={170} height={45} />
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Войти или создать профиль</Text>

            {/* Social Login Options */}
            <View style={styles.socialContainer}>
              {SigninMethod.map((method) => {
                const isSelected = selectedAuthMethod === method.name;

                return (
                  <TouchableOpacity
                    key={method.name}
                    style={[
                      styles.socialButton,
                      isSelected ? styles.socialButtonSelected : styles.socialButtonDefault
                    ]}
                    onPress={() => handleMethodSelect(method.name)}
                    activeOpacity={0.7}
                  >
                    <CustomIconComponent
                      name={method.icon}
                      size={22}
                      color={isSelected ? method.color : "black"}
                    />
                    {isSelected && (
                      <Text style={[styles.methodText, { fontSize: 12 }]}>
                        {method.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Phone Input */}
            <PhoneInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={t("auth:phonePlaceholder")}
              setCountryCode={setCountryCode}
            />

            {/* Get Code Button */}
            <TouchableOpacity
              style={[styles.button, mutation.isPending && styles.buttonDisabled]}
              onPress={() => mutation.mutate({ phoneNumber: formatPhoneNumber(phoneNumber, countryCode), selectedAuthMethod: selectedAuthMethod as SignInType })}
              disabled={mutation.isPending}
            >
              <Text style={styles.buttonText}>
                {mutation.isPending ? t("auth:sending") : t("auth:getCode")}
              </Text>
            </TouchableOpacity>

            {/* Terms Checkbox */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => {
                setAcceptedTerms(!acceptedTerms);
                if (showTermsError) {
                  setShowTermsError(false);
                }
              }}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked,
                  showTermsError && !acceptedTerms && styles.checkboxError,
                ]}
              >
                {acceptedTerms && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text
                style={[
                  styles.termsText,
                  showTermsError && !acceptedTerms && styles.termsTextError,
                ]}
              >
                {t("auth:acceptTerms")}
              </Text>
            </TouchableOpacity>
            {showTermsError && !acceptedTerms && (
              <Text style={styles.errorText}>{t("auth:acceptTermsError")}</Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    flexGrow: 1,
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#111827",
  },
  socialContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  socialButton: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    borderRadius: 100,
    borderColor: "#e5e7eb",
    minHeight: 50,
    backgroundColor: "white",
  },
  socialButtonDefault: {
  },
  socialButtonSelected: {
    flex: 2,
    paddingHorizontal: 20,
    gap: 8,
  },
  methodText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#5353F9",
  },
  smsText: {
    color: "#5353F9",
    marginLeft: 8,
    fontWeight: "500",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    marginBottom: 16,
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "#f9fafb",
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
  },
  flag: {
    fontSize: 20,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },
  button: {
    height: 56,
    backgroundColor: "#6366f1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  checkboxError: {
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  termsText: {
    fontSize: 14,
    color: "#6b7280",
    flex: 1,
  },
  termsTextError: {
    color: "#ef4444",
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
    marginLeft: 32,
  },
});