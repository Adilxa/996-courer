import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

interface CustomHeaderComponentProps {
  onNotificationPress?: () => void;
  onMenuPress?: () => void;
  style?: ViewStyle;
}

export const CustomHeaderComponent: React.FC<CustomHeaderComponentProps> = ({
  onNotificationPress,
  onMenuPress,
  style,
}) => {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background.primary,
          borderBottomColor: isDark ? colors.darkBorder : colors.border.light
        },
        style
      ]}
    >
      {/* Logo text on the left */}
      {/* <View style={styles.logoContainer}>
        <Text style={[styles.logoText, { color: colors.primary[500] }]}>
          996<Text style={[styles.dotText, { color: "#ec4899" }]}>.kg</Text>
        </Text>
      </View> */}
      <CustomIconComponent name="logo" color={colors.primary[500]} width={100} height={40} />

      {/* Icons on the right */}
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.iconButton}
        >
          <Feather name="bell" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Feather name="menu" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dotText: {
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
});
