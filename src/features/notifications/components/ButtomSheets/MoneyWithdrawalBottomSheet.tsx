import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "../../../../shared/components/ui/BottomSheet";

interface MoneyWithdrawalBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MoneyWithdrawalBottomSheet({
  isVisible,
  onClose,
}: MoneyWithdrawalBottomSheetProps) {
  const { t } = useTranslation();

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={t("wallet:withdrawalConfirmation")}
    >
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetText}>
          {t("wallet:confirmWithdrawal", { amount: "5 000 с" })}
        </Text>
        <Text style={styles.linkText}>
          {t("wallet:withdrawalProcessingInfo")}
        </Text>
        <TouchableOpacity style={styles.bottomSheetButton}>
          <Text style={styles.bottomSheetButtonText}>
            {t("common:continue")}
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
  linkText: {
    fontSize: 14,
    color: "#6366f1",
    marginBottom: 20,
    lineHeight: 20,
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
});
