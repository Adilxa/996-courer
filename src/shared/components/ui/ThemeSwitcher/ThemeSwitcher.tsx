import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ThemeSwitcherProps {
  style?: any;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ style }) => {
  const { theme, toggleTheme, colors } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <View style={[styles.container, style, { backgroundColor: colors.background.secondary }]}>
      <TouchableOpacity
        style={[
          styles.themeButton,
          !isDarkMode && styles.activeThemeButton,
        ]}
        onPress={() => toggleTheme()}
      >
        <CustomIconComponent
          name="sunny"
          size={20}
          color={!isDarkMode ? colors.white : colors.text.secondary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeButton,
          isDarkMode && styles.activeThemeButton,
        ]}
        onPress={() => toggleTheme()}
      >
        <CustomIconComponent
          name="moon"
          size={20}
          color={isDarkMode ? colors.white : colors.text.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 4,
  },
  themeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
  },
  activeThemeButton: {
    backgroundColor: "#5353F9",
  },
});
