import { SignInType } from "@/features/auth/screens/AuthFormScreen/api";

export const SigninMethod = [
    {
        name: SignInType.WHATSAPP,
        icon: "whatsapp",
        color: "#5353F9",
        description: "WhatsApp",
        isActive: true
    },
    {
        name: SignInType.TELEGRAM,
        icon: "telegram",
        color: "#5353F9",
        description: "Telegram",
        isActive: false
    },
    {
        name: SignInType.EMAIL,
        icon: "email",
        color: "#5353F9",
        description: "Email",
        isActive: false
    },
    {
        name: SignInType.SMS,
        icon: "chat",
        color: "#5353F9",
        description: "СМС-код",
        isActive: false
    }
];