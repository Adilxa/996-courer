import { NotificationModal } from "@/features/notifications/screens/NotificationModal";
import { BASE_URL } from "@/shared/api/http";
import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import {
  BurgerMenuComponent,
  CustomHeaderComponent,
  SafeAreaScreenComponent,
} from "@/shared/components";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { getApplications, getProfile } from "./api";

const userInfo = [
  {
    key: "applicationsAmount"
  },
  {
    key: "applicationsDone"
  },
  {
    key: "createdAt"
  }
]

const StatCardLoader = ({ colors }: { colors: any }) => (
  <View style={[styles.statCard, styles.loaderCard, { backgroundColor: colors.background.primary, borderWidth: 1, borderColor: 'white' }]}>
    <ActivityIndicator size="small" color={colors.primary[500]} />
    <View style={[styles.loaderLine, { backgroundColor: colors.background.secondary }]} />
    <View style={[styles.loaderLine, { width: '60%', backgroundColor: colors.background.secondary }]} />
  </View>
);

const ProfileLoader = ({ colors }: { colors: any }) => (
  <View style={[styles.profileContainer, { backgroundColor: colors.background.primary, borderWidth: 1, borderColor: 'white' }]}>
    <View style={[styles.userAvatar, styles.loaderAvatar, { backgroundColor: colors.background.secondary, borderWidth: 1, borderColor: 'white' }]}>
      <ActivityIndicator size="small" color={colors.primary[500]} />
    </View>
    <View style={[styles.loaderLine, { width: 150, height: 20, backgroundColor: colors.background.secondary }]} />

    <View style={[styles.userInfo, { borderColor: 'white', borderWidth: 1 }]}>
      {userInfo.map((_, i) => (
        <View key={`loader_${i}`} style={styles.userInfoRow}>
          <View style={[styles.loaderLine, { width: 120, height: 16, backgroundColor: colors.background.secondary }]} />
          <View style={[styles.loaderLine, { width: 80, height: 16, backgroundColor: colors.background.secondary }]} />
        </View>
      ))}
    </View>
  </View>
);

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { data, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile()
  })

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => getApplications()
  })

  return (
    <SafeAreaScreenComponent backgroundColor={colors.background.primary}>
      {/* Header */}
      <CustomHeaderComponent
        onNotificationPress={() => setShowNotifications(true)}
        onMenuPress={() => setShowMenu(!showMenu)}
      />

      {/* Burger Menu */}
      <BurgerMenuComponent
        isVisible={showMenu}
        onClose={() => setShowMenu(false)}
      />

      <ScrollView style={[styles.content, { backgroundColor: colors.background.primary }]} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {applicationsLoading ? (
            <StatCardLoader colors={colors} />
          ) : (
            <View style={[styles.statCard, { backgroundColor: colors.background.primary, borderWidth: 1, borderColor: 'white' }]}>
              <CustomIconComponent name="applications" size={34} color={colors.white} />
              <Text style={[styles.statTitle, { color: colors.text.primary }]}>{t("home:applications")}</Text>
              <Text style={[styles.statValue, { color: colors.text.primary }]}>{applications?.amount || 0}</Text>
              <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{t("home:thisMonth")}</Text>
            </View>
          )}

          <View style={[styles.statCard, { backgroundColor: colors.background.primary, borderWidth: 1, borderColor: 'white' }]}>
            <CustomIconComponent name="cash" size={34} color={colors.white} />
            <Text style={[styles.statTitle, { color: colors.text.primary }]}>{t("home:income")}</Text>
            <Text style={[styles.statValue, { color: colors.text.primary }]}>35 000 с</Text>
            <Text style={[styles.statLabel, { color: colors.text.secondary }]}>{t("home:thisMonth")}</Text>
          </View>
        </View>

        {/* Profile Section */}
        {profileLoading ? (
          <ProfileLoader colors={colors} />
        ) : (
          <View style={[styles.profileContainer, { backgroundColor: colors.background.primary, borderWidth: 1, borderColor: 'white' }]}>
            {data?.avatar !== null ? (
              <Image
                source={{ uri: `${BASE_URL}/${data?.avatar?.path}` }}
                style={styles.userAvatar}
              />
            ) : (
              <View style={[styles.userAvatar, { backgroundColor: colors.primary[100], borderWidth: 1, borderColor: 'white' }]}>
                <Text style={[styles.userAvatarText, { color: colors.primary[600] }]}>
                  {data?.name != null ? data?.name[0] : "AV"}
                </Text>
              </View>
            )}

            <Text style={[styles.userName, { color: colors.text.primary }]}>
              {data?.name || "A"} {data?.surname || "V"}
            </Text>

            <View style={[styles.userInfo, { borderColor: 'white', borderWidth: 1 }]}>
              {userInfo.map((item, i) => (
                <View key={`${item.key}_${i}`} style={styles.userInfoRow}>
                  <Text style={[styles.userInfoRowTitle, { color: colors.text.secondary }]}>
                    {t(`home:${item.key}`)}
                  </Text>
                  <Text style={[styles.userInfoRowValue, { color: colors.text.primary }]}>
                    {data?.[item.key] || '-'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <NotificationModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    width: "100%",
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 10
  },
  // Стили для лоадеров
  loaderCard: {
    justifyContent: "center",
    minHeight: 140,
  },
  loaderAvatar: {
  },
  loaderLine: {
    height: 12,
    borderRadius: 6,
    width: "80%",
    marginVertical: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  pvzCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  pvzCardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  pvzCardInfo: {
    marginLeft: 12,
  },
  pvzCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  pvzCardDescription: {
    fontSize: 14,
  },
  contactIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    flex: 1,
    fontSize: 14,
  },
  scheduleTable: {
    marginBottom: 16,
  },
  scheduleHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  scheduleHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  scheduleRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  scheduleDay: {
    flex: 1,
    fontSize: 14,
  },
  scheduleHours: {
    flex: 1,
    fontSize: 14,
  },
  scheduleLunch: {
    flex: 1,
    fontSize: 14,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  editButtonText: {
    fontSize: 14,
    marginLeft: 4,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  footerDate: {
    fontSize: 14,
  },
  footerDateValue: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 4,
  },
  footerPhone: {
    fontSize: 16,
    fontWeight: "600",
  },
  // Menu styles
  menuOverlay: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
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
  },
  userAvatar: {
    width: "35%",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarText: {
    fontSize: 28,
    fontWeight: "700",
  },
  userInfo: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    flexDirection: "column",
    gap: 10,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  userInfoRowTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  userInfoRowValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
  },
  loginButton: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  languageButtons: {
    flexDirection: "row",
    gap: 8,
  },
  themeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  languageSelector: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 2,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
  },
  activeLangButton: {
  },
  langText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeLangText: {
    color: "#ffffff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  startSellingButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  startSellingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  menuSections: {
    marginTop: 20,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  menuLink: {
    fontSize: 14,
    paddingVertical: 4,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  socialIconText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  appStoreSection: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 20,
  },
  appStoreButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  appStoreText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "500",
  },
  logoutButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  copyright: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
});