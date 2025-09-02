import { Ionicons } from "@expo/vector-icons"; // fallback
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

// Import only SVGs you actually use
import {
  Applications,
  Cash,
  ChatIcon,
  EmailIcon,
  GeoPoint,
  Home,
  List,
  OnBicycle,
  OnCar,
  OnFoot,
  OnVehicle,
  Profile,
  QrCode,
  TelegramIcon,
  Time,
  Wallet,
  WhatsAppIcon,
} from "./Index";

interface CustomIconComponentProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const svgIconMap = {
  chat: ChatIcon,
  email: EmailIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  "qr-code": QrCode,
  home: Home,
  list: List,
  profile: Profile,
  wallet: Wallet,
  applications: Applications,
  cash: Cash,
  time: Time,
  onFoot: OnFoot,
  onVehicle: OnVehicle,
  onBicycle: OnBicycle,
  onCar: OnCar,
  geoPoint: GeoPoint,
  // Fallback icons that will use Ionicons
  notification: null,
  menu: null,
  close: null,
  star: null,
  location: null,
  phone: null,
  package: null,
  orders: null,
  calendar: null,
  camera: null,
  edit: null,
  filter: null,
  chevronUp: null,
  chevronDown: null,
} as const;

export const CustomIconComponent: React.FC<CustomIconComponentProps> = ({
  name,
  size = 24,
  color = "#000",
  style,
}) => {
  const SvgComponent = svgIconMap[name as keyof typeof svgIconMap];

  // Map of fallback Ionicons for common icons
  const ionIconMap: { [key: string]: string } = {
    notification: "notifications-outline",
    menu: "menu-outline",
    close: "close",
    star: "star-outline",
    location: "location-outline",
    phone: "call-outline",
    package: "cube-outline",
    orders: "list-outline",
    calendar: "calendar-outline",
    camera: "camera-outline",
    edit: "create-outline",
    filter: "filter-outline",
    chevronUp: "chevron-up-outline",
    chevronDown: "chevron-down-outline",
    facebook: "logo-facebook",
    instagram: "logo-instagram",
    odnoklassniki: "people-outline",
    vk: "logo-vk",
    whatsapp: "logo-whatsapp",
    telegram: "paper-plane-outline",
    sunny: "sunny-outline",
    moon: "moon-outline",
  };

  return (
    <View style={[styles.container, style]}>
      {SvgComponent ? (
        <SvgComponent width={size} height={size} fill={color} color={color} />
      ) : ionIconMap[name] ? (
        <Ionicons name={ionIconMap[name] as any} size={size} fill={color} color={color} />
      ) : (
        <Ionicons name="close" size={size} color={color} /> // fallback X
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
