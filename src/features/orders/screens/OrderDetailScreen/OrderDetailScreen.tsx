import { SafeAreaScreenComponent } from "@/shared/components/ui";
import { useTheme } from "@/shared/configs/context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface OrderDetailScreenProps {
    orderId: string;
}

export default function OrderDetailScreen({ orderId }: OrderDetailScreenProps) {
    const { t } = useTranslation();
    const { colors, isDark } = useTheme();

    const orderData = {
        orderNumber: orderId,
        totalAmount: t("orderDetail:totalAmount"),
        itemCount: t("orderDetail:itemCount"),
        items: [
            { name: t("orderDetail:items.frenchFries"), quantity: 1 },
            { name: t("orderDetail:items.doubleChickenCheeseburger"), quantity: 1 },
            { name: t("orderDetail:items.cola1l"), quantity: 1 }
        ],
        support: {
            title: t("orderDetail:support.title"),
            subtitle: t("orderDetail:support.subtitle")
        },
        sos: {
            title: t("orderDetail:sos.title"),
            subtitle: t("orderDetail:sos.subtitle"),
            isUrgent: true
        }
    };

    return (
        <SafeAreaScreenComponent backgroundColor={colors.background.primary}>
            <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[
                    styles.header,
                    {
                        backgroundColor: colors.background.card,
                        shadowColor: isDark ? "transparent" : "#000",
                        shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0 : 0.1,
                        shadowRadius: isDark ? 0 : 4,
                        elevation: isDark ? 0 : 3,
                    }
                ]}>
                    <View style={styles.headerLeft}>
                        <Text style={[styles.orderLabel, { color: colors.text.secondary }]}>{t("orderDetail:orderNumberLabel")}</Text>
                        <View style={styles.orderNumberContainer}>
                            <Text style={[styles.orderNumber, { color: colors.text.primary }]}>{orderData.orderNumber}</Text>
                            <TouchableOpacity style={styles.copyButton}>
                                <Ionicons name="copy-outline" size={18} color={colors.text.secondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={[styles.totalAmount, { color: colors.text.primary }]}>{orderData.totalAmount}</Text>
                        <Text style={[styles.itemCount, { color: colors.text.secondary }]}>{orderData.itemCount}</Text>
                    </View>
                </View>

                {/* Order Items */}
                <View style={[
                    styles.section,
                    {
                        backgroundColor: colors.background.card,
                        shadowColor: isDark ? "transparent" : "#000",
                        shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0 : 0.1,
                        shadowRadius: isDark ? 0 : 4,
                        elevation: isDark ? 0 : 3,
                    }
                ]}>
                    <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{t("orderDetail:orderItems")}</Text>
                    {orderData.items.map((item, index) => (
                        <View key={index} style={[
                            styles.orderItem,
                            { borderBottomColor: isDark ? colors.darkBorder : '#F0F0F0' }
                        ]}>
                            <Text style={[styles.itemName, { color: colors.text.primary }]}>{item.name}</Text>
                            <Text style={[styles.itemQuantity, { color: colors.text.primary }]}>{item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Support Section */}
                <TouchableOpacity style={[
                    styles.supportItem,
                    {
                        backgroundColor: colors.background.card,
                        shadowColor: isDark ? "transparent" : "#000",
                        shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0 : 0.1,
                        shadowRadius: isDark ? 0 : 4,
                        elevation: isDark ? 0 : 3,
                    }
                ]}>
                    <View style={styles.supportContent}>
                        <Text style={[styles.supportTitle, { color: colors.text.primary }]}>{t("orderDetail:support:title")}</Text>
                        <Text style={[styles.supportSubtitle, { color: colors.text.secondary }]}>{t("orderDetail:support:subtitle")}</Text>
                    </View>
                    <View style={styles.supportIcon}>
                        <Ionicons name="information-circle-outline" size={24} color={colors.text.secondary} />
                    </View>
                </TouchableOpacity>

                {/* SOS Section */}
                <TouchableOpacity style={[
                    styles.sosItem,
                    {
                        backgroundColor: colors.background.card,
                        shadowColor: isDark ? "transparent" : "#000",
                        shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0 : 0.1,
                        shadowRadius: isDark ? 0 : 4,
                        elevation: isDark ? 0 : 3,
                    }
                ]}>
                    <View style={styles.sosContent}>
                        <Text style={[styles.sosTitle, { color: colors.text.primary }]}>{t("orderDetail:sos:title")}</Text>
                        <Text style={[styles.sosSubtitle, { color: colors.text.secondary }]}>{t("orderDetail:sos:subtitle")}</Text>
                    </View>
                    <View style={styles.sosIcon}>
                        <Ionicons name="warning" size={24} color="#FF4444" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push(`/(protected)/main/orders/map/${orderId}` as any)}
                    style={styles.mapButton}>
                    <Ionicons name="map" size={24} color="#ffffff" />
                    <Text style={styles.mapButtonText}>{t("orderDetail:map")}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaScreenComponent >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 16,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    orderLabel: {
        fontSize: 14,
        marginBottom: 4,
    },
    orderNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '600',
    },
    copyButton: {
        padding: 4,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    itemCount: {
        fontSize: 14,
        marginTop: 2,
    },
    section: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    itemName: {
        fontSize: 16,
        flex: 1,
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: '600',
        minWidth: 20,
        textAlign: 'right',
    },
    supportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    supportContent: {
        flex: 1,
    },
    supportTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    supportSubtitle: {
        fontSize: 14,
    },
    supportIcon: {
        marginLeft: 12,
    },
    sosItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    sosContent: {
        flex: 1,
    },
    sosTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    sosSubtitle: {
        fontSize: 14,
    },
    sosIcon: {
        marginLeft: 12,
    },
    mapButton: {
        backgroundColor: "#6366f1",
        paddingVertical: 16,
        borderRadius: 100,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    mapButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff",
    }
});