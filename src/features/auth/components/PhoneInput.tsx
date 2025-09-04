import { useTheme } from "@/shared/configs/context/ThemeContext";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Country, CountrySelector } from "./CountrySelector";

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  setCountryCode?: (code: string) => void;
}

const defaultCountry: Country = {
  code: "KG",
  dialCode: "+996",
  flag: "🇰🇬",
  mask: "(999) 99-99-99",
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  placeholder,
  error,
  setCountryCode
}) => {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);

  const applyMask = (text: string, mask: string): string => {
    const cleanText = text.replace(/\D/g, "");
    let maskedText = "";
    let textIndex = 0;

    for (let i = 0; i < mask.length && textIndex < cleanText.length; i++) {
      if (mask[i] === "9") {
        maskedText += cleanText[textIndex];
        textIndex++;
      } else {
        maskedText += mask[i];
      }
    }

    return maskedText;
  };

  const handleTextChange = (text: string) => {
    const maskedText = applyMask(text, selectedCountry.mask);
    onChangeText(maskedText);
  };

  useEffect(() => {
    setCountryCode?.(selectedCountry.dialCode);
  }, [selectedCountry]);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    // Clear the input when country changes
    onChangeText("");
  };

  const getPlaceholder = () => {
    return selectedCountry.mask.replace(/9/g, "0");
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text.primary }]}>{t("auth:phoneNumber")}</Text>
      <View style={[
        styles.inputContainer,
        {
          backgroundColor: colors.background.card,
          borderColor: isDark ? colors.border.light : "#e5e7eb",
        },
        error && styles.inputError
      ]}>
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
        <View style={[styles.separator, { backgroundColor: isDark ? colors.border.light : "#e5e7eb" }]} />
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder || getPlaceholder()}
          placeholderTextColor={colors.text.tertiary}
          keyboardType="numeric"
          maxLength={selectedCountry.mask.length}
          autoComplete="tel"
          textContentType="telephoneNumber"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: "relative",
    zIndex: 1000,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  separator: {
    width: 1,
    height: 40,
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "#ef4444",
    marginTop: 4,
  },
});
