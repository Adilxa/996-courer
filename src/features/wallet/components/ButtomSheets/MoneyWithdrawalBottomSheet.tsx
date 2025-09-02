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

interface MoneyWithdrawalBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  balance: number | string;
  onWithdraw?: (amount: string) => void;
}

// Компонент подтверждения вывода (второй уровень)
const WithdrawalConfirmationBottomSheet = ({
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
      height={100 * 3.5}
    >
      <View style={styles.confirmationContent}>
        <Text style={styles.confirmationTitle}>
          {t("wallet:sureWithdrawal", { amount: `${amount} с` })}
        </Text>

        <Text style={styles.confirmationDescription}>
          {t("wallet:withdrawDescription")}
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

// Компонент успешного создания запроса (третий уровень)
const WithdrawalSWaitingBottomSheet = ({
  isVisible,
  onClose,
  amount,
  transactionId
}: {
  isVisible: boolean;
  onClose: () => void;
  amount: string;
  transactionId: string;
}) => {
  const { t } = useTranslation();

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title={t("wallet:requestCreated")}
      height={100 * 3.5}
    >
      <View style={styles.successContent}>
        {/* Описание */}
        <Text style={styles.successDescription}>
          {t("wallet:requestDescription")}
        </Text>

        {/* Иконка успеха */}
        <View style={{ marginBottom: 20 }}>
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

export default function MoneyWithdrawalBottomSheet({
  isVisible,
  onClose,
  balance,
  onWithdraw,
}: MoneyWithdrawalBottomSheetProps) {
  const { t } = useTranslation();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Конвертируем баланс в число для валидации
  const numericBalance = typeof balance === 'string'
    ? parseFloat(balance.replace(/[^\d.]/g, ''))
    : balance;

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

    if (numericAmount > numericBalance) {
      return t("wallet:errors.insufficientFunds");
    }

    if (numericAmount < 100) {
      return t("wallet:errors.minimumWithdrawal", { amount: "100 с" });
    }

    return '';
  };

  const handleAmountChange = (text: string) => {
    const cleanText = text.replace(/[^\d.]/g, '');
    const parts = cleanText.split('.');
    if (parts.length > 2) {
      return;
    }

    setWithdrawAmount(cleanText);

    if (error) {
      setError('');
    }
  };

  // Первый уровень -> Второй уровень
  const handleContinue = () => {
    handleDismissKeyboard();

    const validationError = validateAmount(withdrawAmount);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!acceptedTerms) {
      setShowTermsError(true);
      return;
    }

    setShowConfirmation(true);
  };

  // Второй уровень -> Третий уровень
  const handleConfirmWithdrawal = async () => {
    setIsLoading(true);

    try {
      // Имитируем запрос к серверу
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Генерируем ID транзакции
      const newTransactionId = Math.random().toString().substring(2, 10);
      setTransactionId(newTransactionId);

      // Вызываем колбэк
      onWithdraw?.(withdrawAmount);

      // Переходим к третьему уровню
      setShowConfirmation(false);
      setShowSuccess(true);

    } catch (err) {
      setError(t("wallet:errors.withdrawalFailed"));
      setShowConfirmation(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMaxAmount = () => {
    setWithdrawAmount(numericBalance.toString());
    setError('');
  };

  const handleToggleTerms = () => {
    setAcceptedTerms(!acceptedTerms);
    if (showTermsError) {
      setShowTermsError(false);
    }
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
    setWithdrawAmount('');
    setError('');
    setAcceptedTerms(false);
    setShowTermsError(false);
    setTransactionId('');
  };

  // Очищаем состояние при закрытии основного BottomSheet
  useEffect(() => {
    if (!isVisible) {
      setWithdrawAmount('');
      setError('');
      setIsLoading(false);
      setAcceptedTerms(false);
      setShowTermsError(false);
      setShowConfirmation(false);
      setShowSuccess(false);
      setTransactionId('');
    }
  }, [isVisible]);

  const isValidAmount = withdrawAmount && !validateAmount(withdrawAmount);
  const canProceed = isValidAmount && acceptedTerms && !isLoading;

  return (
    <>
      {/* Первый уровень: Ввод данных */}
      <BottomSheet
        isVisible={isVisible && !showConfirmation && !showSuccess}
        onClose={onClose}
        title={t("wallet:withdrawalConfirmation")}
      >
        <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
          <View style={styles.bottomSheetContent}>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                {t("wallet:enterWithdrawAmount")}
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
                  value={withdrawAmount}
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
                  style={styles.maxButton}
                  onPress={handleMaxAmount}
                >
                  <Text style={styles.maxButtonText}>
                    {t("common:all")}
                  </Text>
                </TouchableOpacity>
              </View>

              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>

            <View style={styles.balanceInfo}>
              <Ionicons name="wallet-outline" size={20} color="#6366f1" />
              <Text style={styles.balanceInfoText}>
                {t("wallet:availableBalance")}: {numericBalance} с
              </Text>
            </View>

            <View style={styles.feeInfo}>
              <Ionicons name="information-circle-outline" size={16} color="#6b7280" />
              <Text style={styles.feeInfoText}>
                {t("wallet:withdrawalProcessingInfo")}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.termsContainer}
              onPress={handleToggleTerms}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxChecked,
                  showTermsError && !acceptedTerms && styles.checkboxError,
                ]}
              >
                {acceptedTerms && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text
                style={[
                  styles.termsText,
                  showTermsError && !acceptedTerms && styles.termsTextError,
                ]}
              >
                {t("wallet:acceptWithdrawalTerms")}
              </Text>
            </TouchableOpacity>

            {showTermsError && !acceptedTerms && (
              <Text style={styles.termsErrorText}>
                {t("wallet:errors.mustAcceptTerms")}
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.bottomSheetButton,
                !canProceed && styles.disabledButton
              ]}
              onPress={handleContinue}
              disabled={!canProceed}
            >
              <Text style={[
                styles.bottomSheetButtonText,
                !canProceed && styles.disabledButtonText
              ]}>
                {t("common:continue")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </BottomSheet>

      {/* Второй уровень: Подтверждение */}
      <WithdrawalConfirmationBottomSheet
        isVisible={showConfirmation}
        onClose={handleCloseConfirmation}
        amount={withdrawAmount}
        onConfirm={handleConfirmWithdrawal}
        isLoading={isLoading}
      />

      {/* Третий уровень: Успех */}
      <WithdrawalSWaitingBottomSheet
        isVisible={showSuccess}
        onClose={handleCloseSuccess}
        amount={withdrawAmount}
        transactionId={transactionId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    paddingBottom: 20,
    flex: 1,
  },
  balanceInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  balanceInfoText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 20,
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
  maxButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  maxButtonText: {
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
  feeInfo: {
    flexDirection: "row",
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  feeInfoText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
    lineHeight: 20,
    flex: 1,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#d1d5db",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "white",
  },
  checkboxChecked: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  checkboxError: {
    borderColor: "#ef4444",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  termsTextError: {
    color: "#ef4444",
  },
  termsErrorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: -15,
    marginBottom: 15,
    marginLeft: 32,
  },
  bottomSheetButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
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
    marginBottom: 24,
    lineHeight: 20,
  },
  confirmationButtons: {
    flexDirection: "row",
    gap: 12,
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
  requestDetails: {
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
  statusBadge: {
    backgroundColor: "#fbbf24",
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
    backgroundColor: "#eff6ff",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: "#6366f1",
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