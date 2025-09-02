import { SignInType } from "@/features/auth/screens/AuthFormScreen/api";
import { useLocalSearchParams } from "expo-router";
import OtpScreen from "../../src/features/auth/screens/OtpScreen/OtpScreen";

const Otp = () => {
  const { phoneNumber, selectedAuthMethod } = useLocalSearchParams();
  return <OtpScreen phoneNumber={phoneNumber as string} selectedAuthMethod={selectedAuthMethod as SignInType} />;
};

export default Otp;
