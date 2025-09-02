import OrderMapDetail from '@/features/orders/screens/OrderMapDetail/OrderMapDetail';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function Map() {

    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <>

            <OrderMapDetail orderId={id} />
        </>
    )
}