import $api from "@/shared/api/http"
import { storage } from "@/shared/util/storage"
import { SignInType } from "../AuthFormScreen/api"

const onAuth = async (phoneNumber: string, code: string) => {
    try {
        const response = await $api.post('/company/authenticate', {
            phoneNumber,
            code,
            policyAccepted: true
        })
        await storage.set('user', JSON.stringify(response.data))
        return true;
    } catch (error) {
        console.log('auth', error)
        throw error
    }
}

const resendOtp = async (phoneNumber: string, signInType: SignInType) => {
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



export { onAuth, resendOtp }

