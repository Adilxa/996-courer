import { useTheme } from '@/shared/configs/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';


interface OrderCardProps {
    restaurantName: string;
    orderNumber: string;
    orderTotal: string;
    deliveryAddress: string;
    restaurantAddress: string;
    estimatedDeliveryTime: string;
    id: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({
    restaurantName,
    orderNumber,
    orderTotal,
    deliveryAddress,
    restaurantAddress,
    estimatedDeliveryTime,
    id,
}) => {
    const { t } = useTranslation();
    const { colors, isDark } = useTheme();

    return (
        <TouchableOpacity style={[
            styles.container,
            {
                backgroundColor: colors.background.card,
                borderColor: isDark ? colors.darkBorder : '#E5E7EB',
                shadowColor: isDark ? "transparent" : "#000",
                shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                shadowOpacity: isDark ? 0 : 0.1,
                shadowRadius: isDark ? 0 : 3.84,
                elevation: isDark ? 0 : 5,
            }
        ]}
            onPress={() => {
                router.push(`/(protected)/main/orders/${id}` as any);
            }}
        >
            {/* Top Section - Restaurant Name */}
            <View style={styles.topSection}>
                <View style={styles.restaurantInfo}>
                    <Text style={[styles.restaurantLabel, { color: colors.text.secondary }]}>{t('orderCard:restaurant')}</Text>
                    <Text style={[styles.restaurantName, { color: colors.text.primary }]}>{restaurantName}</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="call" size={18} color={colors.text.secondary} />
                </TouchableOpacity>
            </View>

            {/* Main Order Details Block */}
            <View style={[
                styles.orderDetailsBlock,
                { backgroundColor: isDark ? colors.darkElements : '#F3F4F6' }
            ]}>
                <Text style={[styles.orderDetailText, { color: colors.text.primary }]}>
                    {t('orderCard:restaurant')} {restaurantName}
                </Text>
                <Text style={[styles.orderDetailText, { color: colors.text.primary }]}>
                    {t('orderCard:orderNumber')} {orderNumber}
                </Text>
                <Text style={[styles.orderDetailText, { color: colors.text.primary }]}>
                    {t('orderCard:orderTotal')} {orderTotal}
                </Text>
                <Text style={[styles.orderDetailText, { color: colors.text.primary }]}>
                    {deliveryAddress}
                </Text>
            </View>

            {/* Bottom Section - Restaurant Address */}
            <View style={styles.bottomSection}>
                <View style={styles.addressSection}>
                    <Text style={[styles.sectionLabel, { color: colors.text.secondary }]}>{t('orderCard:restaurantAddress')}</Text>
                    <Text style={[styles.addressText, { color: colors.text.primary }]}>{restaurantAddress}</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="navigate" size={16} color={colors.text.secondary} />
                </TouchableOpacity>
            </View>

            {/* Delivery Time Section */}
            <View style={styles.deliveryTimeSection}>
                <View style={styles.timeInfo}>
                    <Text style={[styles.sectionLabel, { color: colors.text.secondary }]}>{t('orderCard:estimatedDeliveryTime')}</Text>
                    <Text style={[styles.deliveryTimeText, { color: colors.text.primary }]}>{estimatedDeliveryTime}</Text>
                </View>
                <View style={styles.iconButton}>
                    <Ionicons name="time" size={18} color={colors.text.secondary} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        // backgroundColor, borderColor, shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation теперь применяются динамически
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    restaurantInfo: {
        flex: 1,
    },
    restaurantLabel: {
        fontSize: 12,
        // color теперь применяется динамически
        marginBottom: 2,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        // color теперь применяется динамически
    },
    orderDetailsBlock: {
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        // backgroundColor теперь применяется динамически
    },
    orderDetailText: {
        fontSize: 14,
        // color теперь применяется динамически
        marginBottom: 4,
        lineHeight: 20,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressSection: {
        flex: 1,
    },
    sectionLabel: {
        fontSize: 12,
        // color теперь применяется динамически
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        // color теперь применяется динамически
        lineHeight: 20,
    },
    deliveryTimeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeInfo: {
        flex: 1,
    },
    deliveryTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        // color теперь применяется динамически
    },
    iconButton: {
        padding: 4,
        backgroundColor: "#EBEBEB",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
});
