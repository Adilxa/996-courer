import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeAreaScreenComponentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: "light-content" | "dark-content";
  statusBarBackgroundColor?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
}

export const SafeAreaScreenComponent: React.FC<
  SafeAreaScreenComponentProps
> = ({
  children,
  style,
  backgroundColor,
  statusBarStyle = "dark-content",
  statusBarBackgroundColor,
  edges = ["top", "bottom", "left", "right"],
}) => {
    return (
      <View style={[styles.container, backgroundColor && { backgroundColor }]}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={statusBarBackgroundColor || backgroundColor}
          translucent={Platform.OS === "android"}
        />
        <SafeAreaView style={[styles.content, style]}>{children}</SafeAreaView>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
