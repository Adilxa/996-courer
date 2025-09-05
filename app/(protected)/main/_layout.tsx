import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";

export default function TabLayout() {
  const { colors, isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: isDark ? colors.darkBorder : colors.border.light,
          borderTopWidth: 1,
          height: Platform.OS === "android" ? 65 : 90,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Кошелек",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: "#ec4899",
                borderRadius: 30,
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <CustomIconComponent name="qr-code" size={28} color={colors.white} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Заказы",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="text-document" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профиль",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
