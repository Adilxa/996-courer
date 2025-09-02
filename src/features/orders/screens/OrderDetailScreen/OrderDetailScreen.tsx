import { SafeAreaScreenComponent } from "@/shared/components/ui";
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
    const orderData = {
        orderNumber: orderId,
        totalAmount: "960 С",
        itemCount: "3 позиции",
        items: [
            { name: "Картофель фри", quantity: 1 },
            { name: "Двойной чизбургер с курицей", quantity: 1 },
            { name: "Кола 1 л.", quantity: 1 }
        ],
        support: {
            title: "Поддержка",
            subtitle: "Если есть проблемы с заказом"
        },
        sos: {
            title: "SOS",
            subtitle: "Если вы в беде",
            isUrgent: true
        }
    };

    const { t } = useTranslation();

    return (
        <SafeAreaScreenComponent backgroundColor="white">
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.orderLabel}>Номер заказа</Text>
                        <View style={styles.orderNumberContainer}>
                            <Text style={styles.orderNumber}>{orderData.orderNumber}</Text>
                            <TouchableOpacity style={styles.copyButton}>
                                <Ionicons name="copy-outline" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <Text style={styles.totalAmount}>{orderData.totalAmount}</Text>
                        <Text style={styles.itemCount}>{orderData.itemCount}</Text>
                    </View>
                </View>

                {/* Order Items */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Состав заказа</Text>
                    {orderData.items.map((item, index) => (
                        <View key={index} style={styles.orderItem}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemQuantity}>{item.quantity}</Text>
                        </View>
                    ))}
                </View>

                {/* Support Section */}
                <TouchableOpacity style={styles.supportItem}>
                    <View style={styles.supportContent}>
                        <Text style={styles.supportTitle}>{orderData.support.title}</Text>
                        <Text style={styles.supportSubtitle}>{orderData.support.subtitle}</Text>
                    </View>
                    <View style={styles.supportIcon}>
                        <Ionicons name="information-circle-outline" size={24} color="#666" />
                    </View>
                </TouchableOpacity>

                {/* SOS Section */}
                <TouchableOpacity style={styles.sosItem}>
                    <View style={styles.sosContent}>
                        <Text style={styles.sosTitle}>{orderData.sos.title}</Text>
                        <Text style={styles.sosSubtitle}>{orderData.sos.subtitle}</Text>
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
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerLeft: {
        flex: 1,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    orderLabel: {
        fontSize: 14,
        color: '#666',
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
        color: '#000',
    },
    copyButton: {
        padding: 4,
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    itemCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    itemName: {
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        minWidth: 20,
        textAlign: 'right',
    },
    supportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    supportContent: {
        flex: 1,
    },
    supportTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    supportSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    supportIcon: {
        marginLeft: 12,
    },
    sosItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sosContent: {
        flex: 1,
    },
    sosTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    sosSubtitle: {
        fontSize: 14,
        color: '#666',
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