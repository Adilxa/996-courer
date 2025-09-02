import { SafeAreaScreenComponent } from "@/shared/components";
import { CustomHeaderComponent } from "@/shared/components/layout/CustomHeaderComponent/CustomHeaderComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ManualScannerScreen() {
  const { t } = useTranslation();
  const [orderNumber, setOrderNumber] = useState("");

  const handleConfirm = () => {
    if (orderNumber.trim()) {
      // Handle order confirmation
      console.log("Order confirmed:", orderNumber);
    }
  };

  return (
    <SafeAreaScreenComponent
      backgroundColor="#ffffff"
      statusBarStyle="dark-content"
    >
      <CustomHeaderComponent />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{t("scanner:enterOrderNumber")}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={orderNumber}
            onChangeText={setOrderNumber}
            placeholder={t("scanner:orderNumberPlaceholder")}
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            !orderNumber.trim() && styles.disabledButton,
          ]}
          onPress={handleConfirm}
          disabled={!orderNumber.trim()}
        >
          <Text
            style={[
              styles.confirmButtonText,
              !orderNumber.trim() && styles.disabledButtonText,
            ]}
          >
            {t("scanner:confirm")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    textAlign: "center",
    color: "#111827",
  },
  confirmButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  disabledButton: {
    backgroundColor: "#f3f4f6",
  },
  disabledButtonText: {
    color: "#9ca3af",
  },
});
