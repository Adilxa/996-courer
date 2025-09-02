import React from 'react';
import { View } from 'react-native';
import LOGO from "../../../assets/logos/LogoLightMode.svg";

export default function LoadingScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LOGO />
        </View>
    )
}