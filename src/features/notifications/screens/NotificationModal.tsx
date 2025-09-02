import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { useTheme } from "@/shared/configs/context/ThemeContext";
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
  const { colors } = useTheme();
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
          <TouchableWithoutFeedback onPress={() => { }}>
            <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
              {/* Header */}
              <View style={[styles.header, { backgroundColor: colors.background.primary, borderBottomColor: colors.border.light }]}>
                <TouchableOpacity onPress={onClose}>
                  <CustomIconComponent
                    name="chevronLeft"
                    size={24}
                    color={colors.text.primary}
                  />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
                  {t("notifications:title")}
                </Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Tabs */}
              <View style={[styles.tabContainer, { backgroundColor: colors.background.primary, borderBottomColor: colors.border.light }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    style={[
                      styles.tab,
                      { backgroundColor: colors.background.secondary },
                      activeTab === "all" && { backgroundColor: colors.primary[500] },
                    ]}
                    onPress={() => setActiveTab("all")}
                  >
                    <View style={styles.tabContent}>
                      <CustomIconComponent
                        name="notification"
                        size={20}
                        color={activeTab === "all" ? colors.white : colors.primary[500]}
                      />
                      <Text
                        style={[
                          styles.tabText,
                          { color: activeTab === "all" ? colors.white : colors.primary[500] },
                        ]}
                      >
                        {t("notifications:all")}
                      </Text>
                      {hasUnreadNotifications("all") && (
                        <View style={[styles.unreadDot, { backgroundColor: colors.error[500] }]} />
                      )}
                    </View>
                  </TouchableOpacity>

                  {["notification", "payment", "news"].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.tab,
                        { backgroundColor: colors.background.secondary },
                        activeTab === type && { backgroundColor: colors.primary[500] },
                      ]}
                      onPress={() => setActiveTab(type as any)}
                    >
                      <View style={styles.tabContent}>
                        <CustomIconComponent
                          name={getTabIcon(type) as any}
                          size={20}
                          color={activeTab === type ? colors.white : colors.primary[500]}
                        />
                        <Text
                          style={[
                            styles.tabText,
                            { color: activeTab === type ? colors.white : colors.primary[500] },
                          ]}
                        >
                          {getTabTitle(type)}
                        </Text>
                        {hasUnreadNotifications(type) && (
                          <View style={[styles.unreadDot, { backgroundColor: colors.error[500] }]} />
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
                        color={colors.text.secondary}
                      />
                    </View>
                    <Text style={[styles.emptyStateTitle, { color: colors.text.secondary }]}>
                      {t("notifications:empty")}
                    </Text>
                  </View>
                ) : (
                  filteredNotifications.map((notification) => (
                    <TouchableOpacity
                      key={notification.id}
                      style={[
                        styles.notificationItem,
                        { backgroundColor: colors.background.primary },
                        !notification.isRead && { borderLeftColor: colors.primary[500] },
                      ]}
                      onPress={() => markAsRead(notification.id)}
                    >
                      <View style={[styles.notificationIcon, { backgroundColor: colors.primary[100] }]}>
                        <CustomIconComponent
                          name={getTabIcon(notification.type) as any}
                          size={24}
                          color={colors.primary[500]}
                        />
                      </View>
                      <View style={styles.notificationContent}>
                        <Text style={[styles.notificationTitle, { color: colors.text.primary }]}>
                          {notification.title}
                        </Text>
                        <Text
                          style={[styles.notificationMessage, { color: colors.text.secondary }]}
                          numberOfLines={3}
                        >
                          {notification.message}
                        </Text>
                        <Text style={[styles.notificationTime, { color: colors.text.secondary }]}>
                          {notification.time}
                        </Text>
                      </View>
                      {!notification.isRead && (
                        <View style={[styles.unreadIndicator, { backgroundColor: colors.primary[500] }]} />
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.9, // Изменено с maxHeight на height и увеличено до 90%
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  tabContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  tab: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    textAlign: "center",
  },
  notificationItem: {
    flexDirection: "row",
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
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
});
