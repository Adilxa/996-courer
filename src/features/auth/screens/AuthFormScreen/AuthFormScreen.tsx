import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { CustomLogoComponent } from "@/shared/assets/logos/settings/CustomLogoComponent";
import { useTheme } from "@/shared/configs/context/ThemeContext";
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
  const { colors, isDark } = useTheme();
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
    <SafeAreaScreenComponent backgroundColor={colors.background.primary}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background.primary}
      />
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background.primary }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <CustomLogoComponent name={isDark ? "dark" : "light"} width={170} height={45} />
          </View>

          {/* Main Card */}
          <View style={[
            styles.card,
            {
              backgroundColor: colors.background.card,
              shadowColor: isDark ? "transparent" : "#000",
              shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
              shadowOpacity: isDark ? 0 : 0.1,
              shadowRadius: isDark ? 0 : 8,
              elevation: isDark ? 0 : 4,
            }
          ]}>
            <Text style={[styles.title, { color: colors.text.primary }]}>Войти или создать профиль</Text>

            {/* Social Login Options */}
            <View style={styles.socialContainer}>
              {SigninMethod.map((method) => {
                const isSelected = selectedAuthMethod === method.name;

                return (
                  <TouchableOpacity
                    key={method.name}
                    style={[
                      styles.socialButton,
                      {
                        borderColor: isDark ? 'transparent' : "#e5e7eb",
                        backgroundColor: isDark ? colors.background.secondary : "white",
                      },
                      isSelected ? styles.socialButtonSelected : styles.socialButtonDefault
                    ]}
                    onPress={() => handleMethodSelect(method.name)}
                    activeOpacity={0.7}
                  >
                    <CustomIconComponent
                      name={method.icon}
                      size={22}
                      color={isSelected ? method.color : (isDark ? colors.text.primary : "black")}
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
              style={[
                styles.button,
                { backgroundColor: colors.primary[500] },
                mutation.isPending && styles.buttonDisabled
              ]}
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
                  {
                    borderColor: isDark ? colors.border.light : "#d1d5db",
                  },
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
                  { color: colors.text.secondary },
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
  },
  card: {
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
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
    minHeight: 50,
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
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRightWidth: 1,
  },
  flag: {
    fontSize: 20,
  },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
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