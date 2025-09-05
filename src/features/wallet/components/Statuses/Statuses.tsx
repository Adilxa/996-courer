import { useTheme } from '@/shared/configs/context/ThemeContext';
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
    const { colors, isDark } = useTheme();
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
            <TouchableOpacity
                onPress={() => setShowStatusFilter(!showStatusFilter)}
                style={[
                    styles.statusFilter,
                    {
                        backgroundColor: colors.background.card,
                        shadowColor: isDark ? "transparent" : "#000",
                        shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0 : 0.05,
                        shadowRadius: isDark ? 0 : 8,
                        elevation: isDark ? 0 : 2,
                    }
                ]}
            >
                <Ionicons name="funnel" size={20} color={colors.text.secondary} />
                <Text style={[styles.filterLabel, { color: colors.text.primary }]}>{t("wallet:status:title")}</Text>
                <Text style={[styles.filterValue, { color: colors.text.primary }]}>{t("wallet:paymentType")}</Text>
                {
                    showStatusFilter ? (
                        <Ionicons name="chevron-up" size={20} color={colors.text.secondary} />
                    ) : (
                        <Ionicons name="chevron-down" size={20} color={colors.text.secondary} />
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
                                    style={[
                                        styles.tab,
                                        {
                                            backgroundColor: colors.background.card,
                                            borderColor: colors.border.light
                                        },
                                        isActive && styles.activeTab
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            // { color: isDark ? colors.text.primary : colors.text.secondary }
                                            {
                                                color: isActive
                                                    ? (isDark ? colors.text.totalWhite : colors.text.inverse)
                                                    : (isDark ? colors.text.primary : colors.text.secondary)
                                            }
                                        ]}
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
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
    },
    activeTab: {
        backgroundColor: "#6366f1",
        borderColor: "#6366f1",
    },
    tabText: {
        fontSize: 14,
    },
    activeTabText: {
        color: "white",
    },
    statusFilter: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    filterLabel: {
        fontSize: 14,
        marginLeft: 8,
    },
    filterValue: {
        fontSize: 14,
        flex: 1,
        textAlign: "right",
        marginRight: 8,
    },
});

export default Statuses;