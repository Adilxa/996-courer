import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ThemeSwitcherProps {
  style?: any;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ style }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // TODO: Implement theme switching logic
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.themeButton,
          !isDarkMode && styles.activeThemeButton,
        ]}
        onPress={() => !isDarkMode && toggleTheme()}
      >
        <CustomIconComponent 
          name="sunny" 
          size={20} 
          color={!isDarkMode ? "white" : "#6b7280"} 
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeButton,
          isDarkMode && styles.activeThemeButton,
        ]}
        onPress={() => isDarkMode && toggleTheme()}
      >
        <CustomIconComponent 
          name="moon" 
          size={20} 
          color={isDarkMode ? "white" : "#6b7280"} 
        />
      </TouchableOpacity>
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
