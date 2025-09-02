import { NotificationModal } from "@/features/notifications/screens/NotificationModal";
import {
  BurgerMenuComponent,
  CustomHeaderComponent,
} from "@/shared/components";
import { useLanguage } from "@/shared/configs/context/LanguageContext";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MoneyWithdrawalBottomSheet from "../../components/ButtomSheets/MoneyWithdrawalBottomSheet";
import SecurityDepositBottomSheet from "../../components/ButtomSheets/SecurityDepositBottomSheet";
import { CalendarModal, DateRange } from "../../components/DatePicker/DatePIcker";
import Statuses from "../../components/Statuses/Statuses";
import { getProfile, getWallet } from "./api";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
}

// Компонент лоадера для карточек кошелька
const WalletCardLoader = () => (
  <View style={[styles.balanceCard, styles.loaderCard]}>
    <View style={styles.balanceHeader}>
      <ActivityIndicator size="small" color="#6b7280" />
      <View style={[styles.loaderLine, { width: 100, marginLeft: 8 }]} />
    </View>
    <View style={[styles.loaderLine, { width: 150, marginBottom: 4 }]} />
    <View style={[styles.loaderLine, { width: 100, height: 32 }]} />
  </View>
);

const ActionCardLoader = () => (
  <View style={[styles.actionCard, styles.loaderCard]}>
    <View style={styles.actionHeader}>
      <ActivityIndicator size="small" color="#6366f1" />
      <View style={[styles.loaderLine, { width: 120, marginLeft: 8 }]} />
    </View>
    <View style={[styles.loaderLine, { width: 140, marginBottom: 4 }]} />
    <View style={[styles.loaderLine, { width: 80, height: 20 }]} />
  </View>
);

export default function WalletScreen() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [activeBottomSheet, setActiveBottomSheet] = useState<string | null>(
    null
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Состояние для календаря
  const [selectedDateText, setSelectedDateText] = useState<string>("");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  });
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const [statuses, setStatuses] = useState<number[]>([]);

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      amount: 1500,
      description: "wallet:topUpTransaction",
      date: "12.02.24, 12:34",
      status: "completed",
    },
    {
      id: "2",
      type: "expense",
      amount: 1500,
      description: "wallet:cancelled",
      date: "12.02.24, 12:34",
      status: "cancelled",
    },
    {
      id: "3",
      type: "expense",
      amount: 1500,
      description: "wallet:servicePayment",
      date: "12.02.24, 12:34",
      status: "pending",
    },
  ];

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile()
  });

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: () => getWallet(profile?.companyUuid, 'balance'),
    enabled: !!profile?.companyUuid
  });

  const { data: topUpData, isLoading: topUpLoading } = useQuery({
    queryKey: ['wallet', 'topUp'],
    queryFn: () => getWallet(profile?.companyUuid, 'topUp'),
    enabled: !!profile?.companyUuid
  });

  const { data: withdrawData, isLoading: withdrawLoading } = useQuery({
    queryKey: ['wallet', 'withdraw'],
    queryFn: () => getWallet(profile?.companyUuid, 'withdraw'),
    enabled: !!profile?.companyUuid
  });

  const { data: depositData, isLoading: depositLoading } = useQuery({
    queryKey: ['wallet', 'deposit'],
    queryFn: () => getWallet(profile?.companyUuid, 'deposit'),
    enabled: !!profile?.companyUuid
  });

  // Функции для работы с календарем
  const handleDateRangeApply = (dateRange: DateRange, formattedText: string) => {
    setSelectedDateRange(dateRange);
    setSelectedDateText(formattedText);
    // Здесь можно добавить логику фильтрации транзакций по датам
    console.log('Applied date range:', dateRange);
  };

  const clearDateFilter = () => {
    setSelectedDateRange({ startDate: null, endDate: null });
    setSelectedDateText("");
  };

  const openBottomSheet = (type: string) => {
    setActiveBottomSheet(type);
  };

  const closeBottomSheet = () => {
    setActiveBottomSheet(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "pending":
        return "#6366f1";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return t("wallet:status:completed");
      case "pending":
        return t("wallet:status:pending");
      case "cancelled":
        return t("wallet:status:cancelled");
      default:
        return status;
    }
  };

  console.log(statuses, "statuses");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <CustomHeaderComponent
        onNotificationPress={() => setShowNotifications(true)}
        onMenuPress={() => setShowMenu(!showMenu)}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Баланс */}
        {balanceLoading ? (
          <WalletCardLoader />
        ) : (
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Ionicons name="wallet" size={24} color="#6b7280" />
              <Text style={styles.balanceLabel}>{t("wallet:balance")}</Text>
            </View>
            <Text style={styles.availableBalance}>
              {t("wallet:availableBalance")}:
            </Text>
            <Text style={styles.balanceAmount}>
              {balanceData?.amount || 0} с
            </Text>
          </View>
        )}

        {/* Пополнение баланса */}
        {topUpLoading ? (
          <ActionCardLoader />
        ) : (
          <TouchableOpacity
            style={styles.actionCard}
          >
            <View style={styles.actionHeader}>
              <Ionicons name="add" size={24} color="#10b981" />
              <Text style={styles.actionTitle}>{t("wallet:topUpBalance")}</Text>
            </View>
            <Text style={styles.actionSubtitle}>{t("wallet:minimumTopUp")}:</Text>
            <Text style={styles.actionAmount}>
              {topUpData?.amount || 500} с
            </Text>
          </TouchableOpacity>
        )}

        {/* Вывод средств */}
        {withdrawLoading ? (
          <ActionCardLoader />
        ) : (
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openBottomSheet("withdraw")}
          >
            <View style={styles.actionHeader}>
              <Ionicons name="card" size={24} color="#6366f1" />
              <Text style={styles.actionTitle}>{t("wallet:withdraw")}</Text>
            </View>
            <Text style={styles.actionSubtitle}>
              {t("wallet:availableToWithdraw")}:
            </Text>
            <Text style={styles.actionAmount}>
              {withdrawData?.amount || 0} с
            </Text>
          </TouchableOpacity>
        )}

        {/* Страховой депозит */}
        {depositLoading ? (
          <ActionCardLoader />
        ) : (
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => openBottomSheet("insurance")}
          >
            <View style={styles.actionHeader}>
              <Ionicons name="shield-checkmark" size={24} color="#f59e0b" />
              <Text style={styles.actionTitle}>
                {t("wallet:securityDeposit")}
              </Text>
            </View>
            <Text style={styles.actionSubtitle}>
              {t("wallet:automaticAmount")}:
            </Text>
            <Text style={styles.actionAmount}>
              {depositData?.amount || 0} с
            </Text>
          </TouchableOpacity>
        )}

        {/* Фильтры */}
        <TouchableOpacity
          style={styles.dateFilter}
          onPress={() => setShowCalendarModal(true)}
        >
          <Ionicons name="calendar" size={20} color="#6b7280" />
          <Text style={[
            styles.dateText,
            selectedDateText && styles.selectedDateText
          ]}>
            {selectedDateText || t("filters:dateRange")}
          </Text>
          {selectedDateText ? (
            <TouchableOpacity onPress={clearDateFilter}>
              <Ionicons name="close" size={20} color="#6b7280" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          )}
        </TouchableOpacity>

        <Statuses setStatuses={setStatuses} statuses={statuses} />

        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>{t("common:apply")}</Text>
        </TouchableOpacity>

        {/* Список транзакций */}
        {/* <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDate}>
                  {t("wallet:date")}: {transaction.date}
                </Text>
                <Text style={styles.transactionId}>
                  {t("wallet:transactionNumber")}: 📋 2728328929
                </Text>
                <Text style={styles.transactionDescription}>
                  {t(transaction.description)}
                </Text>
                <Text style={styles.transactionAmount}>
                  {t("wallet:amount")}: {transaction.amount} с
                </Text>
                <View style={styles.transactionStatus}>
                  <Text style={styles.statusLabel}>
                    {t("wallet:status:title")}:
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(transaction.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {getStatusText(transaction.status)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View> */}
      </ScrollView>

      <MoneyWithdrawalBottomSheet
        isVisible={activeBottomSheet === "withdraw"}
        onClose={closeBottomSheet}
        balance={withdrawData?.amount || 0}
      />
      <SecurityDepositBottomSheet
        isVisible={activeBottomSheet === "insurance"}
        onClose={closeBottomSheet}
      />

      {/* Calendar Modal */}
      <CalendarModal
        visible={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        currentLanguage={currentLanguage}
        onApply={handleDateRangeApply}
        initialDateRange={selectedDateRange}
        title={t("filters:selectDateRange")}
        allowSingleDate={true}
      />

      {/* Menu and Notifications */}
      <BurgerMenuComponent
        isVisible={showMenu}
        onClose={() => setShowMenu(false)}
      />
      <NotificationModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  balanceCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 8,
  },
  availableBalance: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 8,
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 4,
  },
  actionAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  // Стили для лоадеров
  loaderCard: {
    justifyContent: "center",
    minHeight: 120,
  },
  loaderLine: {
    height: 12,
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    marginVertical: 2,
  },
  dateFilter: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
    flex: 1,
  },
  selectedDateText: {
    color: "#6366f1",
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});