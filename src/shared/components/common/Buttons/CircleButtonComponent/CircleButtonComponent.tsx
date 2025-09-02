import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type CircleButtonComponentProps = {
  size?: number;
  width?: number;
  borderColor?: string;
  backgroundColor?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  flex?: number;
};

const CircleButtonComponent = ({
  size = 70,
  width,
  borderColor = "#e5e7eb",
  backgroundColor = "white",
  children,
  onPress,
  style,
  flex,
}: CircleButtonComponentProps) => {
  const buttonWidth = width ?? (flex ? undefined : size);
  const minWidth = flex ? size : undefined;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: buttonWidth,
          minWidth: minWidth,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor,
          flex: flex,
        },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CircleButtonComponent;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
});
