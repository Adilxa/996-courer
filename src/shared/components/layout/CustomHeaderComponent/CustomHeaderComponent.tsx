import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
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
  return (
    <View style={[styles.header, style]}>
      {/* Logo text on the left */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          996<Text style={styles.dotText}>.kg</Text>
        </Text>
      </View>

      {/* Icons on the right */}
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={onNotificationPress}
          style={styles.iconButton}
        >
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Feather name="menu" size={24} color="black" />
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
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5353F9",
  },
  dotText: {
    color: "#F80094",
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
