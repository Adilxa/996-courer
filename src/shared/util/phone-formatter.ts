const formatPhoneNumber = (phoneNumber: string, countryCode: string) => {
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    const cleanCountryCode = countryCode.replace(/\D/g, "");

    return cleanCountryCode + cleanPhone;
};


const hidePhoneNumber = (phoneNumber: string): string => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');

    if (cleanNumber.startsWith('996') && cleanNumber.length === 12) {
        const countryCode = cleanNumber.slice(0, 3);
        const operatorCode = cleanNumber.slice(3, 6);

        return `+${countryCode} ${operatorCode} xx-xx-xx`;
    }

    return phoneNumber;
};


export { formatPhoneNumber, hidePhoneNumber };

