import OrderDetailScreen from '@/features/orders/screens/OrderDetailScreen/OrderDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

export default function OrderDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { t } = useTranslation();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `${t('orderDetail:orderNumber')} ${id}`,
                    headerTitle: `${t('orderDetail:orderNumber')} ${id}`,
                    headerBackTitle: t('orders:title'),
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <OrderDetailScreen orderId={id} />
        </>
    );
}
