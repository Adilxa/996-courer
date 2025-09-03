import { NotificationModal } from "@/features/notifications/screens/NotificationModal";
import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import {
  BurgerMenuComponent,
  CustomHeaderComponent,
} from "@/shared/components";
import * as Location from 'expo-location';
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaScreenComponent } from "../../../../shared/components/ui";
import { useLanguage } from "../../../../shared/configs/context/LanguageContext";
import { useTheme } from "../../../../shared/configs/context/ThemeContext";
import { OrderCard } from "../../components/Order-card/OrderCard";
import { TypeSelect } from "../../components/Type-select/TypeSelect";
import { Types, ordersNearby } from "../../constants";

interface LocationData {
  latitude: number;
  longitude: number;
}

export default function OrdersMainScreen() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const { colors, isDark } = useTheme();

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isOnline, setIsOnline] = useState(false); // Новое состояние для онлайн режима

  const [selectedType, setSelectedType] = useState<Types | null>(null);
  const [geoPoint, setGeoPoint] = useState<LocationData | null>(null);

  console.log(selectedType, " selected type");
  console.log(geoPoint, " current location");

  const toggleWorkMode = async () => {
    if (isOnline) {
      // Завершаем работу - переходим в оффлайн режим
      setIsOnline(false);
      setGeoPoint(null);
      return;
    }

    // Начинаем работу - получаем местоположение и включаем онлайн режим
    setIsLoadingLocation(true);

    try {
      // Запрос разрешений на доступ к местоположению
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setIsLoadingLocation(false);
        Alert.alert(
          "Доступ запрещен",
          "Разрешение на доступ к местоположению не предоставлено",
          [{ text: "OK" }]
        );
        return;
      }

      // Получение текущих координат
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      setGeoPoint({ latitude, longitude });
      setIsOnline(true); // Включаем онлайн режим
      setIsLoadingLocation(false);

    } catch (error) {
      setIsLoadingLocation(false);
      console.log('Location error:', error);

      Alert.alert(
        "Ошибка",
        "Не удалось получить местоположение. Проверьте настройки GPS.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <SafeAreaScreenComponent backgroundColor={colors.background.primary}>
      {/* Header */}
      <CustomHeaderComponent
        onNotificationPress={() => setShowNotifications(true)}
        onMenuPress={() => setShowMenu(!showMenu)}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Title */}
        <Text style={[styles.title, { color: colors.text.primary }]}>{t("ordersScreen:title")}</Text>

        {/* Date Filter */}
        <TypeSelect types={selectedType} setType={setSelectedType} />

        {/* Status Filter */}

        {/* Status Options */}

        {/* Apply Button */}
        <TouchableOpacity
          style={[
            styles.applyButton,
            { backgroundColor: isOnline ? colors.error[500] : colors.primary[500] }, // Красная для "закончить работу", синяя для "начать работу"
            isLoadingLocation && styles.applyButtonDisabled
          ]}
          onPress={toggleWorkMode}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <CustomIconComponent
              name={isOnline ? "close" : "geoPoint"}
              size={18}
              color="white"
            />
          )}
          <Text style={styles.applyButtonText}>
            {isLoadingLocation
              ? t("ordersScreen:determining")
              : isOnline
                ? t("ordersScreen:endWork")
                : t("ordersScreen:startWork")
            }
          </Text>
        </TouchableOpacity>

        {/* Title nearby */}
        <Text style={[styles.title, { color: colors.text.primary }]}>{t("ordersScreen:titleNearby")}</Text>

        {/* Orders List - показываем только когда пользователь в сети */}
        {isOnline && selectedType && (
          <View style={styles.ordersList}>
            {ordersNearby.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                restaurantName={order.name}
                orderNumber={order.orderNumber}
                orderTotal={`${order.orderSumm}С.`}
                deliveryAddress={`${order.address}, ${order.description}`}
                restaurantAddress={order.restourantAddress}
                estimatedDeliveryTime={order.deliveryTime}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Burger Menu */}
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // color теперь применяется динамически
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  applyButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    // backgroundColor теперь применяется динамически
  },
  applyButtonDisabled: {
    opacity: 0.7,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  locationText: {
    fontSize: 14,
    // color теперь применяется динамически
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  ordersList: {
    paddingHorizontal: 20,
  },
});