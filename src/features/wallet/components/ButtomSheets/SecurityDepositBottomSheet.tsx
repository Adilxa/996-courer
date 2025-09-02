import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { BottomSheet } from "../../../../shared/components/ui/BottomSheet";

interface SecurityDepositBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  currentDeposit?: number;
  recommendedDeposit?: number;
  onDeposit?: (amount: string) => void;
}

// Компонент подтверждения депозита (второй уровень)
const DepositConfirmationBottomSheet = ({
  isVisible,
  onClose,
  amount,
  onConfirm,
  isLoading
}: {
  isVisible: boolean;
  onClose: () => void;
  amount: string;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={t("wallet:confirmationTitle")}
      height={100 * 3.2}
    >
      <View style={styles.confirmationContent}>
        <Text style={styles.confirmationTitle}>
          {t("wallet:sureDeposit", { amount: `${amount} с` })}
        </Text>

        <Text style={styles.confirmationDescription}>
          {t("wallet:depositBenefits")}
        </Text>

        <View style={styles.confirmationButtons}>
          <TouchableOpacity
            style={[styles.confirmButton, isLoading && styles.disabledButton]}
            onPress={onConfirm}
            disabled={isLoading}
          >
            <Text style={styles.confirmButtonText}>
              {isLoading ? t("common:continue") : t("common:continue")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

// Компонент успешного пополнения депозита (третий уровень)
const DepositSuccessBottomSheet = ({
  isVisible,
  onClose,
  amount,
  newTotalDeposit
}: {
  isVisible: boolean;
  onClose: () => void;
  amount: string;
  newTotalDeposit: string;
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={t("wallet:requestCreated")}
      height={100 * 3.8}
    >
      <View style={styles.successContent}>
        {/* Иконка успеха */}


        {/* Описание */}
        <Text style={styles.successDescription}>
          {t("wallet:depositSuccessDescription")}
        </Text>
        <View style={styles.successIcon}>
          <CustomIconComponent name="time" size={74} color="#fff" />
        </View>
        {/* Кнопка закрытия */}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>
            {t("common:understood")}
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default function SecurityDepositBottomSheet({
  isVisible,
  onClose,
  currentDeposit = 0,
  recommendedDeposit = 1340,
  onDeposit,
}: SecurityDepositBottomSheetProps) {
  const { t } = useTranslation();
  const [depositAmount, setDepositAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const validateAmount = (amount: string) => {
    const numericAmount = parseFloat(amount);

    if (!amount || amount.trim() === '') {
      return t("wallet:errors.enterAmount");
    }

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return t("wallet:errors.invalidAmount");
    }

    // Минимальная сумма депозита
    if (numericAmount < 100) {
      return t("wallet:errors.minimumDeposit", { amount: "100 с" });
    }

    return '';
  };

  const handleAmountChange = (text: string) => {
    const cleanText = text.replace(/[^\d.]/g, '');
    const parts = cleanText.split('.');
    if (parts.length > 2) {
      return;
    }

    setDepositAmount(cleanText);

    if (error) {
      setError('');
    }
  };

  // Первый уровень -> Второй уровень
  const handleContinue = () => {
    handleDismissKeyboard();

    const validationError = validateAmount(depositAmount);
    if (validationError) {
      setError(validationError);
      return;
    }

    setShowConfirmation(true);
  };

  // Второй уровень -> Третий уровень
  const handleConfirmDeposit = async () => {
    setIsLoading(true);

    try {
      // Имитируем запрос к серверу
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Вызываем колбэк
      onDeposit?.(depositAmount);

      // Переходим к третьему уровню
      setShowConfirmation(false);
      setShowSuccess(true);

    } catch (err) {
      setError(t("wallet:errors.depositFailed"));
      setShowConfirmation(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetRecommended = () => {
    setDepositAmount(recommendedDeposit.toString());
    setError('');
  };

  const handleCloseConfirmation = () => {
    if (!isLoading) {
      setShowConfirmation(false);
    }
  };

  // Закрытие третьего уровня и полная очистка
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();

    // Полная очистка состояния
    setDepositAmount('');
    setError('');
  };

  // Очищаем состояние при закрытии основного BottomSheet
  useEffect(() => {
    if (!isVisible) {
      setDepositAmount('');
      setError('');
      setIsLoading(false);
      setShowConfirmation(false);
      setShowSuccess(false);
    }
  }, [isVisible]);

  const isValidAmount = depositAmount && !validateAmount(depositAmount);
  const newTotalDeposit = currentDeposit + (parseFloat(depositAmount) || 0);

  return (
    <>
      {/* Первый уровень: Ввод суммы депозита */}
      <BottomSheet
        isVisible={isVisible && !showConfirmation && !showSuccess}
        onClose={onClose}
        title={t("wallet:securityDeposit")}
      >
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
          <View style={styles.bottomSheetContent}>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                {t("wallet:enterDepositAmount")}
              </Text>

              <View style={[
                styles.inputWrapper,
                error && styles.inputWrapperError
              ]}>
                <TextInput
                  style={[
                    styles.input,
                    error && styles.inputError
                  ]}
                  value={depositAmount}
                  onChangeText={handleAmountChange}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#9ca3af"
                  returnKeyType="done"
                  onSubmitEditing={handleDismissKeyboard}
                  autoFocus={false}
                />
                <Text style={styles.currency}>с</Text>

                <TouchableOpacity
                  style={styles.recommendedButton}
                  onPress={handleSetRecommended}
                >
                  <Text style={styles.recommendedButtonText}>
                    {recommendedDeposit}
                  </Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>
            {/* Текущий депозит */}
            <View style={styles.currentDepositInfo}>
              <Ionicons name="shield-outline" size={20} color="#6366f1" />
              <Text style={styles.currentDepositText}>
                {t("wallet:currentDeposit")}: {currentDeposit} с
              </Text>
            </View>

            <View>
              <Text style={styles.depositDescription}>
                {t("wallet:depositDescription")}
              </Text>
            </View>

            {/* Поле ввода суммы */}

            {/* Кнопка продолжить */}
            <TouchableOpacity
              style={[
                styles.bottomSheetButton,
                !isValidAmount && styles.disabledButton
              ]}
              onPress={handleContinue}
              disabled={!isValidAmount}
            >
              <Text style={[
                styles.bottomSheetButtonText,
                !isValidAmount && styles.disabledButtonText
              ]}>
                {t("common:continue")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>

      {/* Второй уровень: Подтверждение */}
      <DepositConfirmationBottomSheet
        isVisible={showConfirmation}
        onClose={handleCloseConfirmation}
        amount={depositAmount}
        onConfirm={handleConfirmDeposit}
        isLoading={isLoading}
      />

      {/* Третий уровень: Успех */}
      <DepositSuccessBottomSheet
        isVisible={showSuccess}
        onClose={handleCloseSuccess}
        amount={depositAmount}
        newTotalDeposit={newTotalDeposit.toString()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    paddingBottom: 20,
  },
  currentDepositInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  currentDepositText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  depositDescription: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  inputWrapperError: {
    borderColor: "#ef4444",
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: 16,
    color: "#111827",
  },
  inputError: {
    color: "#ef4444",
  },
  currency: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6b7280",
    marginRight: 12,
  },
  recommendedButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  recommendedButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  depositInfoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  depositInfoCardText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
    lineHeight: 20,
    flex: 1,
  },
  recommendedInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  recommendedLabel: {
    fontSize: 16,
    color: "#374151",
  },
  recommendedAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#10b981",
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
  disabledButton: {
    backgroundColor: "#e5e7eb",
  },
  disabledButtonText: {
    color: "#9ca3af",
  },

  // Стили для второго уровня (подтверждение)
  confirmationContent: {
    paddingBottom: 20,
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  confirmationDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  depositInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  depositInfoText: {
    fontSize: 14,
    color: "#065f46",
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  confirmationButtons: {
    flexDirection: "row",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // Стили для третьего уровня (успех)
  successContent: {
    paddingBottom: 20,
    alignItems: "center",
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  successDescription: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  depositDetails: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  detailValuePositive: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10b981",
  },
  statusBadgeActive: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "white",
    fontWeight: "500",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f0fdf4",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: "#10b981",
    marginLeft: 8,
    lineHeight: 20,
    flex: 1,
  },
  closeButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});