import $api from "@/shared/api/http";


export enum SignInType {
    WHATSAPP = "wa",
    TELEGRAM = "tg",
    EMAIL = "email",
    SMS = "sms"
}

const signIn = async (phoneNumber: string, signInType: SignInType) => {
    try {
        const response = await $api.post("/send-otp", {
            phoneNumber,
            signInType
        })
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export { signIn };

