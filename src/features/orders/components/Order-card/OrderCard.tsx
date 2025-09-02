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
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => {
                router.push(`/(protected)/main/orders/${id}` as any);
            }}
        >
            {/* Top Section - Restaurant Name */}
            <View style={styles.topSection}>
                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantLabel}>{t('orderCard:restaurant')}</Text>
                    <Text style={styles.restaurantName}>{restaurantName}</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="call" size={18} color="#9CA3AF" />
                </TouchableOpacity>
            </View>

            {/* Main Order Details Block */}
            <View style={styles.orderDetailsBlock}>
                <Text style={styles.orderDetailText}>
                    {t('orderCard:restaurant')} {restaurantName}
                </Text>
                <Text style={styles.orderDetailText}>
                    {t('orderCard:orderNumber')} {orderNumber}
                </Text>
                <Text style={styles.orderDetailText}>
                    {t('orderCard:orderTotal')} {orderTotal}
                </Text>
                <Text style={styles.orderDetailText}>
                    {deliveryAddress}
                </Text>
            </View>

            {/* Bottom Section - Restaurant Address */}
            <View style={styles.bottomSection}>
                <View style={styles.addressSection}>
                    <Text style={styles.sectionLabel}>{t('orderCard:restaurantAddress')}</Text>
                    <Text style={styles.addressText}>{restaurantAddress}</Text>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="navigate" size={16} color="#9CA3AF" />
                </TouchableOpacity>
            </View>

            {/* Delivery Time Section */}
            <View style={styles.deliveryTimeSection}>
                <View style={styles.timeInfo}>
                    <Text style={styles.sectionLabel}>{t('orderCard:estimatedDeliveryTime')}</Text>
                    <Text style={styles.deliveryTimeText}>{estimatedDeliveryTime}</Text>
                </View>
                <View style={styles.iconButton}>
                    <Ionicons name="time" size={18} color="#9CA3AF" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
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
        color: '#9CA3AF',
        marginBottom: 2,
    },
    restaurantName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    orderDetailsBlock: {
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    orderDetailText: {
        fontSize: 14,
        color: '#111827',
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
        color: '#9CA3AF',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#111827',
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
        color: '#111827',
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
