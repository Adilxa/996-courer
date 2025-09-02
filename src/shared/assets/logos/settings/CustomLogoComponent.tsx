import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { LogoDarkMode, LogoLightMode } from "./Index"; // adjust path if needed

interface CustomLogoComponentProps {
  name: "dark" | "light"; // only two valid logos
  width?: number; // custom width
  height?: number; // custom height
  size?: number; // fallback if width/height not provided
  style?: ViewStyle;
  color?: string; // for fallback X icon
}

const logoMap = {
  dark: LogoDarkMode,
  light: LogoLightMode,
} as const;

export const CustomLogoComponent: React.FC<CustomLogoComponentProps> = ({
  name,
  width,
  height,
  size = 100,
  style,
  color = "#000",
}) => {
  const LogoComponent = logoMap[name];

  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <View style={[styles.container, style]}>
      {LogoComponent ? (
        <LogoComponent width={finalWidth} height={finalHeight} />
      ) : (
        <Ionicons name="close" size={finalWidth} color={color} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
