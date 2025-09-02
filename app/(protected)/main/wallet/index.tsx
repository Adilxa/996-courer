import WalletScreen from "@/features/wallet/screens/WalletScreen/WalletScreen";
import React from "react";
import { StyleSheet } from "react-native";

const WalletPage = () => {
  return <WalletScreen />;
};

export default WalletPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
