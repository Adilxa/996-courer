import ManualScannerScreen from "@/features/scanner/screens/ScannerManualScreen/ScannerManualScreen";
import React from "react";
import { StyleSheet } from "react-native";

const ManualScannerPage = () => {
  return <ManualScannerScreen />;
};

export default ManualScannerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
