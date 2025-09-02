import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { LanguageSwitcher } from "@/shared/components/ui/LanguageSwitcher/LanguageSwitcher";
import { ThemeSwitcher } from "@/shared/components/ui/ThemeSwitcher/ThemeSwitcher";
import { storage } from "@/shared/util/storage";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface BurgerMenuComponentProps {
  isVisible: boolean;
  onClose: () => void;
  style?: ViewStyle;
}

export const BurgerMenuComponent: React.FC<BurgerMenuComponentProps> = ({
  isVisible,
  onClose,
  style,
}) => {
  const { t } = useTranslation();

  if (!isVisible) return null;


  const onLogout = async () => {
    await storage.remove('user');
    await storage.remove('uuid');
    router.push('/(auth)');
  }


  return (
    <View style={[styles.menuOverlay, style]}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <CustomIconComponent name="close" size={24} color="#000000" />
      </TouchableOpacity>

      <ScrollView
        style={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section with Theme and Language */}
        <View style={styles.topSection}>
          <View style={styles.themeLanguageRow}>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </View>
        </View>

        {/* Location and Support */}
        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.locationItem}>
            <CustomIconComponent name="location" size={20} color="#6b7280" />
            <Text style={styles.locationText}>{t("menu:location")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportItem}>
            <CustomIconComponent name="phone" size={20} color="#6b7280" />
            <Text style={styles.supportText}>{t("menu:support")}</Text>
          </TouchableOpacity>
        </View>

        {/* Start Selling Button */}
        <TouchableOpacity style={styles.startSellingButton}>
          <Text style={styles.startSellingText}>{t("menu:startSelling")}</Text>
        </TouchableOpacity>

        {/* Menu Sections */}
        <View style={styles.menuSections}>
          {/* About Company Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{t("menu:about")}</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:contacts")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:requisites")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:vacancies")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:cooperation")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:rightsForm")}</Text>
            </TouchableOpacity>
          </View>

          {/* For Buyers Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{t("menu:forBuyers")}</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:help")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:promoCodes")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:catalog")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:magazine")}</Text>
            </TouchableOpacity>
          </View>

          {/* For Business Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{t("menu:forBusiness")}</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:payment")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:return")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:security")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:promotions")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:becomeSeller")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:saleTerms")}</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Information Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{t("menu:legal")}</Text>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:knowledgeBase")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:dataConsent")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>
                {t("menu:supportRequest")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>{t("menu:ideas")}</Text>
            </TouchableOpacity>
          </View>

          {/* Subscribe Section */}
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>{t("menu:subscribe")}</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialIcon}>
                <CustomIconComponent
                  name="facebook"
                  size={24}
                  color="#1877f2"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <CustomIconComponent
                  name="instagram"
                  size={24}
                  color="#e4405f"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <CustomIconComponent
                  name="odnoklassniki"
                  size={24}
                  color="#ee8208"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <CustomIconComponent name="vk" size={24} color="#0077ff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <CustomIconComponent
                  name="whatsapp"
                  size={24}
                  color="#25d366"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <CustomIconComponent
                  name="telegram"
                  size={24}
                  color="#0088cc"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* App Store Buttons */}
        <View style={styles.appStoreSection}>
          <TouchableOpacity style={styles.appStoreButton}>
            <Text style={styles.appStoreText}>Google Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.appStoreButton}>
            <Text style={styles.appStoreText}>App Store</Text>
          </TouchableOpacity>
        </View>

        {/* Exit Button */}
        <TouchableOpacity style={styles.exitButton} onPress={onLogout}>
          <Text style={styles.exitButtonText}>{t("common:logout")}</Text>
        </TouchableOpacity>

        {/* Copyright */}
        <Text style={styles.copyright}>{t("menu:copyright")}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1001,
    padding: 8,
  },
  menuContent: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  topSection: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  themeLanguageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  themeButtons: {
    flexDirection: "row",
  },
  infoSection: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    marginBottom: 12,
  },
  locationText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
  },
  supportText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f3f4f6",
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
    borderRadius: 8,
  },
  loginButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  languageSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  languageButtons: {
    flexDirection: "row",
  },
  themeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  languageSelector: {
    flexDirection: "row",
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#f9fafb",
    marginLeft: 4,
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  activeLangButton: {
    backgroundColor: "#6366f1",
  },
  activeLangText: {
    color: "white",
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
    marginLeft: 12,
  },
  startSellingButton: {
    backgroundColor: "#5353F9",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 16,
  },
  startSellingText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 20,
  },
  menuSections: {
    flex: 1,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  socialIcons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  socialIcon: {
    marginRight: 16,
    marginBottom: 8,
  },
  appStoreSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  appStoreButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  appStoreText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  exitButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  exitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
