import $api from "@/shared/api/http";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getProfile = async () => {
    try {
        const res = await $api.get('/company/courier/profile');
        await AsyncStorage.setItem('uuid', JSON.stringify(res.data.companyUuid));
        console.log(res.data, " ssdsd");

        return res.data;
    } catch (e) {
        throw e;
    }
}

const getApplications = async () => {
    try {
        const res = await $api.get('/company/courier/applications');
        return res.data;
    } catch (e) {
        throw e;
    }
}

export { getApplications, getProfile };

