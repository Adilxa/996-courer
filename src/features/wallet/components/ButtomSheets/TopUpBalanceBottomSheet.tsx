import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "../../../../shared/components/ui/BottomSheet";

interface TopUpBalanceBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function TopUpBalanceBottomSheet({
  isVisible,
  onClose,
}: TopUpBalanceBottomSheetProps) {
  const { t } = useTranslation();

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={t("wallet:topUpBalance")}
    >
      <View style={styles.bottomSheetContent}>
        <Text style={styles.bottomSheetText}>
          {t("wallet:topUpMinimum", { amount: "5 000 с" })}
        </Text>
        <Text style={styles.bottomSheetLabel}>
          {t("wallet:availableToWithdraw")}
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t("wallet:amount")}</Text>
          <Text style={styles.inputValue}>5 000</Text>
        </View>
        <Text style={styles.agreementText}>{t("wallet:agreementTerms")}</Text>
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
  bottomSheetLabel: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  inputValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  agreementText: {
    fontSize: 14,
    color: "#6b7280",
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
