import $api from "@/shared/api/http";

const getWallet = async (uuid: string, type: string) => {
    try {
        const res = await $api.get(`/companies/${uuid}/income/${type}`);
        return res.data;
    } catch (e) {
        throw e;
    }
}

const getProfile = async () => {
    try {
        const res = await $api.get('/company/courier/profile');
        return res.data;
    } catch (e) {
        throw e;
    }
}


export { getProfile, getWallet };

