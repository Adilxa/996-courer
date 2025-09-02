import { useLanguage } from "@/shared/configs/context/LanguageContext";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LanguageSwitcherProps {
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  style,
}) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { colors } = useTheme();

  const languages = [
    { code: "ru", label: "RU" },
    { code: "kg", label: "KGS" },
    { code: "en", label: "ENG" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background.secondary }, style]}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLanguage === lang.code && { backgroundColor: colors.primary[500] },
          ]}
          onPress={() => changeLanguage(lang.code as any)}
        >
          <Text
            style={[
              styles.languageText,
              { color: currentLanguage === lang.code ? colors.white : colors.text.secondary },
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
    borderRadius: 20,
    padding: 4,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginHorizontal: 2,
  },
  languageText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
