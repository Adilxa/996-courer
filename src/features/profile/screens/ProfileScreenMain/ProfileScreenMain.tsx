import HomeScreen from "@/features/home/screens/HomeScreen/HomeScreen";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useLanguage } from "../../../../shared/configs/context/LanguageContext";

export default function ProfileScreenMain() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    // <SafeAreaView style={styles.container}>
    //   <StatusBar barStyle="dark-content" backgroundColor="white" />

    //   {/* Header */}
    //   <CustomHeaderComponent
    //     onNotificationPress={() => setShowNotifications(true)}
    //     onMenuPress={() => setShowMenu(!showMenu)}
    //   />

    //   <View style={styles.content}>
    //     <Text style={styles.title}>{t("profile:title")}</Text>
    //     <Text style={styles.subtitle}>{t("profile:subtitle")}</Text>
    //   </View>

    //   {/* Burger Menu */}
    //   <BurgerMenuComponent
    //     isVisible={showMenu}
    //     onClose={() => setShowMenu(false)}
    //   />

    //   {/* Notification Modal */}
    //   <NotificationModal
    //     visible={showNotifications}
    //     onClose={() => setShowNotifications(false)}
    //   />
    // </SafeAreaView>
    <HomeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6366f1",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1001,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuScrollView: {
    flex: 1,
    paddingTop: 120,
  },
  menuContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: "#6b7280",
  },
  loginButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  languageSection: {
    marginBottom: 30,
  },
  languageButtons: {
    flexDirection: "row",
    marginBottom: 16,
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  languageSelector: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 25,
    padding: 4,
  },
  langButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  activeLangButton: {
    backgroundColor: "#6366f1",
  },
  langText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6b7280",
  },
  activeLangText: {
    color: "#ffffff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuItemText: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 16,
  },
  startSellingButton: {
    backgroundColor: "#10b981",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },
  startSellingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#ef4444",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ef4444",
  },
  copyright: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    marginTop: "auto",
    paddingBottom: 40,
  },
});
