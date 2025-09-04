import { useTheme } from "@/shared/configs/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface Country {
  code: string;
  dialCode: string;
  flag: string;
  mask: string;
}

const countries: Country[] = [
  {
    code: "KG",
    dialCode: "+996",
    flag: "🇰🇬",
    mask: "(999) 99-99-99",
  },
  {
    code: "KZ",
    dialCode: "+7",
    flag: "🇰🇿",
    mask: "(999) 999-99-99",
  },
  {
    code: "UZ",
    dialCode: "+998",
    flag: "🇺🇿",
    mask: "(99) 999-99-99",
  },
];

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountrySelect,
}) => {
  const { colors, isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setIsVisible(false);
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={[styles.dialCode, { color: colors.text.primary }]}>{item.dialCode}</Text>
      </View>
      {selectedCountry.code === item.code && (
        <Ionicons name="checkmark" size={20} color={colors.primary[500]} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.selector,
          {
            backgroundColor: colors.background.card,
          }
        ]}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={[styles.dialCode, { color: colors.text.primary }]}>{selectedCountry.dialCode}</Text>
        <Ionicons name="chevron-down" size={16} color={colors.text.tertiary} />
      </TouchableOpacity>

      {isVisible && (
        <View style={[
          styles.dropdown,
          {
            backgroundColor: colors.background.card,
            borderColor: isDark ? colors.border.light : "#e5e7eb",
            shadowColor: isDark ? "transparent" : "#000",
            shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 4 },
            shadowOpacity: isDark ? 0 : 0.1,
            shadowRadius: isDark ? 0 : 8,
            elevation: isDark ? 0 : 8,
          }
        ]}>
          {countries.map((country, index) => (
            <TouchableOpacity
              key={country.code}
              style={[
                styles.countryItem,
                {
                  borderBottomColor: isDark ? colors.border.light : "#f3f4f6",
                  borderTopLeftRadius: index === 0 ? 12 : 0,
                  borderTopRightRadius: index === 0 ? 12 : 0,
                  borderBottomLeftRadius: index === countries.length - 1 ? 12 : 0,
                  borderBottomRightRadius: index === countries.length - 1 ? 12 : 0,
                },
                selectedCountry.code === country.code && [
                  styles.selectedItem,
                  { backgroundColor: isDark ? colors.background.secondary : "#f0f8ff" }
                ],
              ]}
              onPress={() => handleCountrySelect(country)}
            >
              <Text style={styles.flag}>{country.flag}</Text>

              {selectedCountry.code === country.code && (
                <Ionicons name="checkmark" size={20} color={colors.primary[500]} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 120,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  dialCode: {
    fontSize: 16,
    marginRight: 4,
    flex: 1,
  },
  container: {
    position: "relative",
    zIndex: 1000,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderRadius: 12,
    borderWidth: 1,
    zIndex: 1001,
    marginTop: 4,
  },
  selectedItem: {
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  countryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  countryName: {
    fontSize: 16,
    marginBottom: 2,
  },
});
