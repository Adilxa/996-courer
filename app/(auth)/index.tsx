import React from "react";
import { StyleSheet } from "react-native";
import AuthFormScreen from "../../src/features/auth/screens/AuthFormScreen/AuthFormScreen";

const AuthScreen = () => {
  return <AuthFormScreen />;
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
