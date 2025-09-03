import { NotificationModal } from "@/features/notifications/screens/NotificationModal";
import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { BurgerMenuComponent, SafeAreaScreenComponent } from "@/shared/components";
import { CustomHeaderComponent } from "@/shared/components/layout/CustomHeaderComponent/CustomHeaderComponent";
import { useLanguage } from "@/shared/configs/context/LanguageContext";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import { Camera, CameraView } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ScannerScreenMain() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { colors, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<"pickup" | "return">("pickup");
  const [orderNumber, setOrderNumber] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(true); // Auto-start camera
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scanAnimation, setScanAnimation] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Используем useRef для анимации, чтобы она не пересоздавалась
  const scanLineAnimation = useRef(new Animated.Value(0)).current;
  const scanLineAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    getCameraPermissions();
  }, []);

  // Запускаем анимацию только когда камера показана и нет успешного скана
  useEffect(() => {
    if (showCamera && hasPermission && !scanSuccess) {
      startScanLineAnimation();
    } else {
      stopScanLineAnimation();
    }

    // Cleanup при размонтировании компонента
    return () => {
      stopScanLineAnimation();
    };
  }, [showCamera, hasPermission, scanSuccess]);

  const startScanLineAnimation = () => {
    // Останавливаем предыдущую анимацию если она запущена
    stopScanLineAnimation();

    scanLineAnimationRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(scanLineAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );

    scanLineAnimationRef.current.start();
  };

  const stopScanLineAnimation = () => {
    if (scanLineAnimationRef.current) {
      scanLineAnimationRef.current.stop();
      scanLineAnimationRef.current = null;
    }
  };

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return; // Prevent multiple scans

    console.log("Сканирование началось...");
    setScanned(true);
    setScanAnimation(true);
    setScanSuccess(true);
    setShowCamera(false); // Сразу скрываем камеру

    // Останавливаем анимацию линии при успешном скане
    stopScanLineAnimation();

    const codeType = type.includes("qr") ? "QR Code" : "Barcode";
    console.log(`${codeType} успешно отсканирован`);
    console.log(`Номер заказа: ${data}`);
    console.log(`Тип кода: ${type}`);

    // Небольшая задержка для визуального эффекта
    setTimeout(() => {
      setScanAnimation(false);
    }, 500);
  };

  const handleScanAgain = () => {
    console.log("Запуск нового сканирования...");
    setShowCamera(true);
    setScanned(false);
    setScanSuccess(false);
    setScanAnimation(false);
  };

  const handleScanPress = () => {
    if (hasPermission === null) {
      Alert.alert(t("auth:error"), t("scanner:requestingPermission"));
      return;
    }
    if (hasPermission === false) {
      Alert.alert(t("auth:error"), t("scanner:noCameraAccess"));
      return;
    }
    setShowCamera(true);
    setScanned(false);
    setScanSuccess(false);
  };

  const handleManualInput = () => {
    router.push("/main/scan/manual");
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    setScanned(false);
    setScanSuccess(false);
    stopScanLineAnimation();
  };

  return (
    <SafeAreaScreenComponent
      backgroundColor={colors.background.primary}
      statusBarStyle={isDark ? "light-content" : "dark-content"}
    >
      <CustomHeaderComponent
        onNotificationPress={() => setShowNotifications(true)}
        onMenuPress={() => setShowMenu(!showMenu)}
      />

      {/* Camera View - Always Active */}
      {showCamera && hasPermission ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: [
                "qr",
                "pdf417",
                "aztec",
                "ean13",
                "ean8",
                "upc_e",
                "upc_a",
                "code39",
                "code93",
                "code128",
                "codabar",
                "itf14",
              ],
            }}
          />

          {/* Camera Overlay - Positioned Absolutely */}
          <View style={styles.cameraOverlay}>
            <View
              style={[
                styles.scanFrame,
                scanAnimation && styles.scanFrameAnimated,
                scanSuccess && styles.scanFrameSuccess,
              ]}
            >
              <View
                style={[
                  styles.scanCorner,
                  scanSuccess && styles.scanCornerSuccess,
                ]}
              />
              <View
                style={[
                  styles.scanCorner,
                  styles.topRight,
                  scanSuccess && styles.scanCornerSuccess,
                ]}
              />
              <View
                style={[
                  styles.scanCorner,
                  styles.bottomLeft,
                  scanSuccess && styles.scanCornerSuccess,
                ]}
              />
              <View
                style={[
                  styles.scanCorner,
                  styles.bottomRight,
                  scanSuccess && styles.scanCornerSuccess,
                ]}
              />

              {/* Scanning Line Animation */}
              {!scanned && !scanSuccess && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      top: scanLineAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 246], // 250 - 4 (border width)
                      }),
                    },
                  ]}
                />
              )}

              {/* Success Animation */}
              {scanSuccess && (
                <View style={styles.successOverlay}>
                  <CustomIconComponent
                    name="success"
                    size={48}
                    color="#10b981"
                  />
                </View>
              )}
            </View>
            <Text style={styles.scanText}>
              {scanSuccess
                ? t("scanner:scanSuccess")
                : t("scanner:scanInstruction")}
            </Text>

          </View>
        </View>
      ) : hasPermission === false ? (
        <View style={[styles.permissionContainer, { backgroundColor: colors.background.primary }]}>
          <CustomIconComponent name="camera" size={64} color={colors.text.secondary} />
          <Text style={[styles.permissionText, { color: colors.text.secondary }]}>{t("scanner:noCameraAccess")}</Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={getCameraPermissions}
          >
            <Text style={styles.permissionButtonText}>{t("scanner:allowAccess")}</Text>
          </TouchableOpacity>
        </View>
      ) : !showCamera && scanSuccess ? (
        <View style={[styles.scanAgainContainer, { backgroundColor: colors.background.primary }]}>
          <CustomIconComponent name="camera" size={64} color={colors.primary[500]} />
          <Text style={[styles.scanSuccessText, { color: colors.primary[500] }]}>{t("scanner:scanSuccess")}</Text>
          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={handleScanAgain}
          >
            <Text style={styles.scanAgainButtonText}>{t("scanner:scanAgain")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.loadingContainer, { backgroundColor: colors.background.primary }]}>
          <CustomIconComponent name="camera" size={64} color={colors.primary[500]} />
          <Text style={[styles.loadingText, { color: colors.primary[500] }]}>{t("scanner:loadingCamera")}</Text>
        </View>
      )}

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={[styles.logo, { color: colors.primary[500] }]}>996.kg</Text>
      </View>

      {/* Tab Buttons */}
      <View style={[styles.tabContainer, { backgroundColor: isDark ? colors.darkElements : "#f3f4f6" }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pickup" && styles.activeTab]}
          onPress={() => setActiveTab("pickup")}
        >
          <Text
            style={[
              styles.tabText,
              { color: colors.text.secondary },
              activeTab === "pickup" && styles.activeTabText,
            ]}
          >
            {t("scanner:pickupOrder")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "return" && styles.activeTab]}
          onPress={() => setActiveTab("return")}
        >
          <Text
            style={[
              styles.tabText,
              { color: colors.text.secondary },
              activeTab === "return" && styles.activeTabText,
            ]}
          >
            {t("scanner:returnOrder")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Manual Input */}
      <TouchableOpacity
        style={[
          styles.manualInput,
          {
            backgroundColor: colors.background.card,
            borderColor: isDark ? colors.darkBorder : "#e5e7eb"
          }
        ]}
        onPress={handleManualInput}
      >
        <Text style={[styles.manualInputText, { color: colors.text.secondary }]}>{t("scanner:enterOrderNumberManually")}</Text>
      </TouchableOpacity>

      {/* Menu and Notifications */}
      <BurgerMenuComponent
        isVisible={showMenu}
        onClose={() => setShowMenu(false)}
      />

      {/* Notification Modal */}
      <NotificationModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    // backgroundColor теперь применяется динамически
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    // color теперь применяется динамически
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 16,
    // backgroundColor теперь применяется динамически
    borderRadius: 25,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#6366f1",
  },
  tabText: {
    fontSize: 16,
    // color теперь применяется динамически
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor теперь применяется динамически
  },
  permissionText: {
    fontSize: 18,
    // color теперь применяется динамически
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor теперь применяется динамически
  },
  loadingText: {
    fontSize: 18,
    // color теперь применяется динамически
    textAlign: "center",
    marginTop: 16,
  },

  // Camera styles
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    pointerEvents: "box-none", // Allow touches to pass through to camera
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  scanFrameAnimated: {
    borderColor: "#fbbf24",
    shadowColor: "#fbbf24",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  scanFrameSuccess: {
    borderColor: "#10b981",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  scanCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#6366f1",
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  scanCornerSuccess: {
    borderColor: "#10b981",
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  topRight: {
    top: -2,
    right: -2,
    left: "auto",
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    top: "auto",
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    top: "auto",
    left: "auto",
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#6366f1",
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  successOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 8,
  },
  scanText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  closeCameraButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  bottomActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  manualInput: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 1,
    // backgroundColor и borderColor теперь применяются динамически
    alignItems: "center",
  },
  manualInputText: {
    fontSize: 16,
    // color теперь применяется динамически
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor теперь применяется динамически
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
    // borderBottomColor теперь применяется динамически
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
    // color теперь применяется динамически
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    // color теперь применяется динамически
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
    // backgroundColor теперь применяется динамически
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  languageSelector: {
    flexDirection: "row",
    // backgroundColor теперь применяется динамически
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
    // color теперь применяется динамически
  },
  activeLangText: {
    color: "#ffffff",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    // borderBottomColor теперь применяется динамически
  },
  menuItemText: {
    fontSize: 16,
    // color теперь применяется динамически
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
    // color теперь применяется динамически
    textAlign: "center",
    marginTop: "auto",
    paddingBottom: 40,
  },
  scanAgainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // backgroundColor теперь применяется динамически
  },
  scanSuccessText: {
    fontSize: 18,
    // color теперь применяется динамически
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    fontWeight: "600",
  },
  scanAgainButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  scanAgainButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});
