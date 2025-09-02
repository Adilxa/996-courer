import { FiltrationStatuses } from '@/shared/interfaces/filtration-statuses';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StatusesProps {
    statuses: number[];
    setStatuses: (statuses: number[]) => void;
}

const Statuses = ({ statuses, setStatuses }: StatusesProps) => {
    const { t } = useTranslation();
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    const onPickStatus = (status: number) => {
        if (statuses.includes(status)) {
            setStatuses(statuses.filter((item: number) => item !== status));
        } else {
            setStatuses([...statuses, status]);
        }
    };

    return (
        <>
            <TouchableOpacity onPress={() => setShowStatusFilter(!showStatusFilter)} style={styles.statusFilter}>
                <Ionicons name="funnel" size={20} color="#6b7280" />
                <Text style={styles.filterLabel}>{t("wallet:status:title")}</Text>
                <Text style={styles.filterValue}>{t("wallet:paymentType")}</Text>
                {
                    showStatusFilter ? (
                        <Ionicons name="chevron-up" size={20} color="#6b7280" />
                    ) : (
                        <Ionicons name="chevron-down" size={20} color="#6b7280" />
                    )
                }
            </TouchableOpacity>
            {
                showStatusFilter && (

                    <View style={styles.transactionTabs}>
                        {[
                            "wallet:sent",
                            "wallet:topUpTransaction",
                            "wallet:processing",
                            "wallet:withdrawal",
                            "wallet:cancelled",
                            "wallet:servicePayment",
                        ].map((tab, index: FiltrationStatuses) => {
                            const isActive = statuses.includes(index);

                            return (
                                <TouchableOpacity
                                    onPress={() => onPickStatus(index)}
                                    key={index}
                                    style={[styles.tab, isActive && styles.activeTab]}
                                >
                                    <Text
                                        style={[styles.tabText, isActive && styles.activeTabText]}
                                    >
                                        {t(tab)}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )
            }
        </>
    );
};

const styles = StyleSheet.create({
    transactionTabs: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 16,
    },
    tab: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    activeTab: {
        backgroundColor: "#6366f1",
        borderColor: "#6366f1",
    },
    tabText: {
        fontSize: 14,
        color: "#6b7280",
    },
    activeTabText: {
        color: "white",
    },
    statusFilter: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    filterLabel: {
        fontSize: 14,
        color: "#374151",
        marginLeft: 8,
    },
    filterValue: {
        fontSize: 14,
        color: "#374151",
        flex: 1,
        textAlign: "right",
        marginRight: 8,
    },
});

export default Statuses;