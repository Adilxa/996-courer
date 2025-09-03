import { SafeAreaScreenComponent } from "@/shared/components";
import { CustomHeaderComponent } from "@/shared/components/layout/CustomHeaderComponent/CustomHeaderComponent";
import { useTheme } from "@/shared/configs/context/ThemeContext";
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
  const { colors, isDark } = useTheme();
  const [orderNumber, setOrderNumber] = useState("");

  const handleConfirm = () => {
    if (orderNumber.trim()) {
      // Handle order confirmation
      console.log("Order confirmed:", orderNumber);
    }
  };

  return (
    <SafeAreaScreenComponent
      backgroundColor={colors.background.primary}
      statusBarStyle={isDark ? "light-content" : "dark-content"}
    >
      <CustomHeaderComponent />

      {/* Content */}
      <View style={[styles.content, { backgroundColor: colors.background.primary }]}>
        <Text style={[styles.title, { color: colors.text.primary }]}>{t("scanner:enterOrderNumber")}</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.background.card,
                color: colors.text.primary,
                borderColor: isDark ? colors.darkBorder : "#e5e7eb",
                borderWidth: 1,
              }
            ]}
            value={orderNumber}
            onChangeText={setOrderNumber}
            placeholder={t("scanner:orderNumberPlaceholder")}
            placeholderTextColor={colors.text.secondary}
            keyboardType="numeric"
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: colors.primary[500] },
            !orderNumber.trim() && [
              styles.disabledButton,
              { backgroundColor: isDark ? colors.darkElements : "#f3f4f6" }
            ],
          ]}
          onPress={handleConfirm}
          disabled={!orderNumber.trim()}
        >
          <Text
            style={[
              styles.confirmButtonText,
              !orderNumber.trim() && [
                styles.disabledButtonText,
                { color: colors.text.secondary }
              ],
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
    // color теперь применяется динамически
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center",
    // backgroundColor теперь применяется динамически
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    // color теперь применяется динамически
    marginBottom: 40,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 40,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 18,
    textAlign: "center",
    // backgroundColor, color и borderColor теперь применяются динамически
  },
  confirmButton: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
    // backgroundColor теперь применяется динамически
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  disabledButton: {
    // backgroundColor теперь применяется динамически
  },
  disabledButtonText: {
    // color теперь применяется динамически
  },
});
