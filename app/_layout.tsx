import { Stack } from "expo-router";
import { View } from "react-native";
import { ProviderComponent } from "../src/shared/configs/providers/ProviderComponent";

export default function RootLayout() {
  return (
    <ProviderComponent>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </ProviderComponent>
  );
}
