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

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const [selectedType, setSelectedType] = useState<Types | null>(null);
  const [geoPoint, setGeoPoint] = useState<LocationData | null>(null);

  console.log(selectedType, " selected type");
  console.log(geoPoint, " current location");

  const getCurrentLocation = async () => {
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
      setIsLoadingLocation(false);

      Alert.alert(
        "Местоположение получено",
        `Широта: ${latitude.toFixed(6)}\nДолгота: ${longitude.toFixed(6)}`,
        [{ text: "OK" }]
      );

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
    <SafeAreaScreenComponent backgroundColor="white">
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
        <Text style={styles.title}>{t("ordersScreen:title")}</Text>

        {/* Date Filter */}
        <TypeSelect types={selectedType} setType={setSelectedType} />

        {/* Status Filter */}

        {/* Status Options */}

        {/* Apply Button */}
        <TouchableOpacity
          style={[styles.applyButton, isLoadingLocation && styles.applyButtonDisabled]}
          onPress={getCurrentLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <CustomIconComponent name="geoPoint" size={18} color="white" />
          )}
          <Text style={styles.applyButtonText}>
            {isLoadingLocation ? "Определяем..." : "Определить мое местоположение"}
          </Text>
        </TouchableOpacity>

        {/* Title nearby */}
        <Text style={styles.title}>{t("ordersScreen:titleNearby")}</Text>

        {/* Orders List */}
        {selectedType && (
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
    color: "#111827",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  applyButton: {
    backgroundColor: "#6366f1",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
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
    color: "#6b7280",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 16,
  },
  ordersList: {
    paddingHorizontal: 20,
  },
});