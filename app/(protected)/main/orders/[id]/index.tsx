import OrderDetailScreen from '@/features/orders/screens/OrderDetailScreen/OrderDetailScreen';
import { useTheme } from '@/shared/configs/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

export default function OrderDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { t } = useTranslation();
    const { colors, isDark } = useTheme();

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `${t('orderDetail:orderNumber')} ${id}`,
                    headerTitle: `${t('orderDetail:orderNumber')} ${id}`,
                    headerBackTitle: t('orders:title'),
                    headerStyle: {
                        backgroundColor: colors.background.primary,
                    },
                    headerTintColor: colors.text.primary,
                    headerTitleStyle: {
                        color: colors.text.primary,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => router.back()}>
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color={colors.text.primary}
                            />
                        </TouchableOpacity>
                    ),
                }}
            />
            <OrderDetailScreen orderId={id} />
        </>
    );
}
