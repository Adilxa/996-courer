import { useLanguage } from "@/shared/configs/context/LanguageContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LanguageSwitcherProps {
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  style,
}) => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = [
    { code: "ru", label: "RU" },
    { code: "kg", label: "KGS" },
    { code: "en", label: "ENG" },
  ];

  return (
    <View style={[styles.container, style]}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLanguage === lang.code && styles.activeLanguageButton,
          ]}
          onPress={() => changeLanguage(lang.code as any)}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === lang.code && styles.activeLanguageText,
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    padding: 4,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  activeLanguageButton: {
    backgroundColor: "#5353F9",
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  activeLanguageText: {
    color: "white",
  },
});
