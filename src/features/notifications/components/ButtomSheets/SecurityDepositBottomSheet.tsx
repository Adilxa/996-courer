import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "../../../../shared/components/ui/BottomSheet";

interface SecurityDepositBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SecurityDepositBottomSheet({
  isVisible,
  onClose,
}: SecurityDepositBottomSheetProps) {
  const { t } = useTranslation();

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={t("wallet:reserveAmount")}
    >
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetText}>{t("wallet:reserveSuccess")}</Text>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner} />
        </View>
        <TouchableOpacity style={styles.bottomSheetButton}>
          <Text style={styles.bottomSheetButtonText}>
            {t("common:understood")}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    paddingBottom: 20,
  },
  bottomSheetText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 16,
    lineHeight: 22,
  },
  bottomSheetButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  bottomSheetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingSpinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#e5e7eb",
    borderTopColor: "#f59e0b",
  },
});
