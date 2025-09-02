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
        <Text style={styles.dialCode}>{item.dialCode}</Text>
      </View>
      {selectedCountry.code === item.code && (
        <Ionicons name="checkmark" size={20} color="#6366f1" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsVisible(!isVisible)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.dialCode}>{selectedCountry.dialCode}</Text>
        <Ionicons name="chevron-down" size={16} color="#9ca3af" />
      </TouchableOpacity>

      {isVisible && (
        <View style={styles.dropdown}>
          {countries.map((country) => (
            <TouchableOpacity
              key={country.code}
              style={[
                styles.countryItem,
                selectedCountry.code === country.code && styles.selectedItem,
              ]}
              onPress={() => handleCountrySelect(country)}
            >
              <Text style={styles.flag}>{country.flag}</Text>

              {selectedCountry.code === country.code && (
                <Ionicons name="checkmark" size={20} color="#6366f1" />
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
    backgroundColor: "white",
    borderRadius: 12,
    minWidth: 120,
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  dialCode: {
    fontSize: 16,
    color: "#374151",
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
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1001,
    marginTop: 4,
  },
  selectedItem: {
    backgroundColor: "#f0f8ff",
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  countryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  countryName: {
    fontSize: 16,
    color: "#111827",
    marginBottom: 2,
  },
});
