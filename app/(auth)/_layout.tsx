import LoadingScreen from "@/shared/components/layout/LoadingScreen/LoadingScreen";
import useStorage from "@/shared/util/storage";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { data: token, loading } = useStorage('user');

  if (loading) {
    return <LoadingScreen />;
  }

  if (token) {
    return <Redirect href={'/(protected)'} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerShown: false }} />
    </Stack>
  );
}