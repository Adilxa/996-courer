import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Notification {
  id: string;
  type: "notification" | "payment" | "news";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "notification",
    title: "Уведомления",
    message:
      "Успейте! Эксклюзивная акция только для вас! Получите скидку 30% на все товары в нашем магазине. Не упустите шанс обновить гардероб или купить подарки по выгодной цене. Акция действует до конца недели, так что поспешите! Только у нас самые стильные и качественные вещи по лучшим ценам. Используйте промокод SALE30 на сайте и наслаждайтесь покупками!",
    time: "18 августа 2023",
    isRead: false,
  },
  {
    id: "2",
    type: "notification",
    title: "Уведомления",
    message:
      "Успейте! Эксклюзивная акция только для вас! Получите скидку 30% на все товары в нашем магазине. Не упустите шанс обновить гардероб или купить подарки по выгодной цене. Акция действует до конца недели, так что поспешите! Только у нас самые стильные и качественные вещи по лучшим ценам. Используйте промокод SALE30 на сайте и наслаждайтесь покупками!",
    time: "18 августа 2023",
    isRead: true,
  },
  {
    id: "3",
    type: "payment",
    title: "Платежи",
    message: "Помогите нам стать лучше!",
    time: "12.32, 01.12.22",
    isRead: false,
  },
  {
    id: "4",
    type: "payment",
    title: "Платежи",
    message: "Платеж в МБанк успешно прошел!",
    time: "12.32, 01.12.22",
    isRead: true,
  },
  {
    id: "5",
    type: "payment",
    title: "Платежи",
    message: "Иван Грек оставил комментарий",
    time: "12.32, 01.12.22",
    isRead: true,
  },
  {
    id: "6",
    type: "payment",
    title: "Платежи",
    message: "Василий Дон оставил комментарий",
    time: "12.32, 01.12.22",
    isRead: true,
  },
  {
    id: "7",
    type: "payment",
    title: "Платежи",
    message: "Обновление 996.kg",
    time: "12.32, 01.12.22",
    isRead: true,
  },
  {
    id: "8",
    type: "payment",
    title: "Платежи",
    message: "Кофейный Мастер оставил комментарий",
    time: "12.32, 01.12.22",
    isRead: true,
  },
  {
    id: "9",
    type: "news",
    title: "Новости",
    message:
      "С днем рождения! Пусть каждый момент этого дня будет наполнен радостью, смехом и теплом. Желаю тебе принимать сюрпризы и открывать перед тобой новые горизонты. Пусть жизнь радует тебя приятными сюрпризами и открывает перед тобой новые горизонты. Счастья, вдохновения и удачи во всех начинаниях. Счастья, вдохновения и удачи во всех делах!",
    time: "АКЦИИ",
    isRead: false,
  },
];

export const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<
    "all" | "notification" | "payment" | "news"
  >("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const getTabIcon = (type: string) => {
    switch (type) {
      case "notification":
        return "notification";
      case "payment":
        return "wallet";
      case "news":
        return "info";
      default:
        return "notification";
    }
  };

  const getTabTitle = (type: string) => {
    switch (type) {
      case "notification":
        return t("notifications:notifications");
      case "payment":
        return t("notifications:payments");
      case "news":
        return t("notifications:news");
      default:
        return t("notifications:all");
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const hasUnreadNotifications = (type?: string) => {
    if (!type || type === "all") {
      return notifications.some((n) => !n.isRead);
    }
    return notifications.some((n) => n.type === type && !n.isRead);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity onPress={onClose}>
                  <CustomIconComponent
                    name="chevronLeft"
                    size={24}
                    color="#374151"
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                  {t("notifications:title")}
                </Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Tabs */}
              <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      activeTab === "all" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("all")}
                  >
                    <View style={styles.tabContent}>
                      <CustomIconComponent
                        name="notification"
                        size={20}
                        color={activeTab === "all" ? "#ffffff" : "#6366f1"}
                      />
                      <Text
                        style={[
                          styles.tabText,
                          activeTab === "all" && styles.activeTabText,
                        ]}
                      >
                        {t("notifications:all")}
                      </Text>
                      {hasUnreadNotifications("all") && (
                        <View style={styles.unreadDot} />
                      )}
                    </View>
                  </TouchableOpacity>

                  {["notification", "payment", "news"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.tab,
                        activeTab === type && styles.activeTab,
                      ]}
                      onPress={() => setActiveTab(type as any)}
                    >
                      <View style={styles.tabContent}>
                        <CustomIconComponent
                          name={getTabIcon(type) as any}
                          size={20}
                          color={activeTab === type ? "#ffffff" : "#6366f1"}
                        />
                        <Text
                          style={[
                            styles.tabText,
                            activeTab === type && styles.activeTabText,
                          ]}
                        >
                          {getTabTitle(type)}
                        </Text>
                        {hasUnreadNotifications(type) && (
                          <View style={styles.unreadDot} />
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Notifications List */}
              <ScrollView
                style={styles.notificationsList}
                showsVerticalScrollIndicator={false}
              >
                {filteredNotifications.length === 0 ? (
                  <View style={styles.emptyState}>
                    <View style={styles.emptyStateIcon}>
                      <CustomIconComponent
                        name="notification"
                        size={48}
                        color="#d1d5db"
                      />
                    </View>
                    <Text style={styles.emptyStateTitle}>
                      {t("notifications:empty")}
                    </Text>
                  </View>
                ) : (
                  filteredNotifications.map((notification) => (
                    <TouchableOpacity
                      key={notification.id}
                      style={[
                        styles.notificationItem,
                        !notification.isRead && styles.unreadNotification,
                      ]}
                      onPress={() => markAsRead(notification.id)}
                    >
                      <View style={styles.notificationIcon}>
                        <CustomIconComponent
                          name={getTabIcon(notification.type) as any}
                          size={24}
                          color="#6366f1"
                        />
                      </View>
                      <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}>
                          {notification.title}
                        </Text>
                        <Text
                          style={styles.notificationMessage}
                          numberOfLines={3}
                        >
                          {notification.message}
                        </Text>
                        <Text style={styles.notificationTime}>
                          {notification.time}
                        </Text>
                      </View>
                      {!notification.isRead && (
                        <View style={styles.unreadIndicator} />
                      )}
                    </TouchableOpacity>
                  ))
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#f9fafb",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
    minHeight: height * 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  tabContainer: {
    backgroundColor: "white",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  tab: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  activeTab: {
    backgroundColor: "#6366f1",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6366f1",
    marginLeft: 8,
  },
  activeTabText: {
    color: "#ffffff",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    marginLeft: 4,
  },
  notificationsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6366f1",
    marginTop: 4,
  },
});
