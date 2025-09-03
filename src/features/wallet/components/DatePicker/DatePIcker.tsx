// CalendarModal.tsx
import { useTheme } from '@/shared/configs/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface CalendarModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (dateRange: DateRange, formattedText: string) => void;
    initialDateRange?: DateRange;
    title?: string;
    allowSingleDate?: boolean;
    currentLanguage: "ru" | "en" | "kg"; // Исправлен тип для текущего языка
}

interface DayItemProps {
    day: number | null;
    isStartDate: boolean;
    isEndDate: boolean;
    isInRange: boolean;
    isToday: boolean;
    onPress: (day: number) => void;
}

// Переводы для дней недели и месяцев
const translations = {
    weekDays: {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        kg: ['Жш', 'Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш']
    },
    months: {
        en: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        ru: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        kg: [
            'Үчтүн айы', 'Бирдин айы', 'Жалган куран', 'Чын куран', 'Бугу', 'Кулжа',
            'Теке', 'Баш оона', 'Аяк оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
        ]
    },
    monthsShort: {
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        kg: ['Үчт', 'Бирд', 'Жалг', 'Чын', 'Бугу', 'Кулж', 'Теке', 'Баш', 'Аяк', 'Тогуз', 'Жетин', 'Бешт']
    }
};

const DayItem: React.FC<DayItemProps> = ({
    day,
    isStartDate,
    isEndDate,
    isInRange,
    isToday,
    onPress
}) => {
    const { colors, isDark } = useTheme();

    const handlePress = (): void => {
        if (day) {
            onPress(day);
        }
    };

    const getDayStyle = (): ViewStyle[] => {
        const styles: ViewStyle[] = [modalStyles.dayItem];

        if (isStartDate || isEndDate) {
            styles.push(modalStyles.rangeBoundary);
            styles.push({ backgroundColor: '#6366f1' }); // Синий фон для выбранных дней
        } else if (isInRange) {
            styles.push(modalStyles.inRange);
            styles.push({ backgroundColor: isDark ? '#1e3a8a' : '#e0e7ff' }); // Темно-синий для темной темы, светло-синий для светлой
        } else if (isToday && day) {
            styles.push(modalStyles.today);
            styles.push({ backgroundColor: isDark ? '#374151' : '#f3f4f6' }); // Темно-серый для темной темы, светло-серый для светлой
        } else if (day) {
            // Обычные дни
            styles.push({ backgroundColor: colors.background.secondary });
        }

        return styles;
    };

    const getTextStyle = (): TextStyle[] => {
        const styles: TextStyle[] = [modalStyles.dayText];

        if (isStartDate || isEndDate) {
            styles.push(modalStyles.rangeBoundaryText);
        } else if (isInRange) {
            styles.push(modalStyles.inRangeText);
        } else if (isToday && day) {
            styles.push(modalStyles.todayText);
        }

        if (!day) {
            styles.push(modalStyles.emptyDayText);
        }

        // Добавляем базовый цвет текста в зависимости от темы
        if (day) {
            if (isStartDate || isEndDate) {
                // Для выбранных дней оставляем белый текст
                styles.push({ color: 'white' });
            } else if (isInRange) {
                // Для дней в диапазоне используем цвет темы
                styles.push({ color: colors.text.primary });
            } else if (isToday) {
                // Для сегодняшнего дня используем цвет темы
                styles.push({ color: colors.text.primary });
            } else {
                // Для обычных дней: серый в светлой теме, светлый в темной
                styles.push({ color: isDark ? colors.text.primary : '#6b7280' });
            }
        }

        return styles;
    };

    return (
        <TouchableOpacity
            style={getDayStyle()}
            onPress={handlePress}
            disabled={!day}
            activeOpacity={0.7}
        >
            <Text style={getTextStyle()}>
                {day || ''}
            </Text>
        </TouchableOpacity>
    );
};

const CalendarModal: React.FC<CalendarModalProps> = ({
    visible,
    onClose,
    onApply,
    initialDateRange,
    title,
    allowSingleDate = true,
    currentLanguage
}) => {
    const { t } = useTranslation();
    const { colors, isDark } = useTheme();

    const modalTitle = title || t('filters:selectDateRange');
    const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange>(
        initialDateRange || { startDate: null, endDate: null }
    );
    const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

    React.useEffect(() => {
        if (initialDateRange) {
            setSelectedDateRange(initialDateRange);
        }
    }, [initialDateRange]);

    const getDaysInMonth = (date: Date): (number | null)[] => {
        const year: number = date.getFullYear();
        const month: number = date.getMonth();
        const firstDay: Date = new Date(year, month, 1);
        const lastDay: Date = new Date(year, month + 1, 0);
        const daysInMonth: number = lastDay.getDate();
        const startingDayOfWeek: number = firstDay.getDay();

        const days: (number | null)[] = [];

        // Пустые дни в начале месяца
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Дни месяца
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const formatMonthYear = (date: Date): string => {
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const lang = currentLanguage as keyof typeof translations.months;

        const monthName = translations.months[lang]?.[monthIndex] ||
            translations.months.en[monthIndex];
        return `${monthName} ${year}`;
    };

    const previousMonth = (): void => {
        const newMonth: Date = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() - 1);
        setCurrentMonth(newMonth);
    };

    const nextMonth = (): void => {
        const newMonth: Date = new Date(currentMonth);
        newMonth.setMonth(newMonth.getMonth() + 1);
        setCurrentMonth(newMonth);
    };

    const selectDate = (day: number): void => {
        const selectedDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);

        if (!selectedDateRange.startDate || (selectedDateRange.startDate && selectedDateRange.endDate)) {
            // Начинаем новый выбор
            setSelectedDateRange({
                startDate: selectedDate,
                endDate: null
            });
        } else if (allowSingleDate) {
            // Если разрешен выбор одной даты, проверяем - та же дата или нет
            if (selectedDate.toDateString() === selectedDateRange.startDate.toDateString()) {
                // Если та же дата, оставляем только одну
                return;
            } else {
                // Устанавливаем конечную дату
                if (selectedDate < selectedDateRange.startDate) {
                    setSelectedDateRange({
                        startDate: selectedDate,
                        endDate: selectedDateRange.startDate
                    });
                } else {
                    setSelectedDateRange({
                        startDate: selectedDateRange.startDate,
                        endDate: selectedDate
                    });
                }
            }
        } else {
            // Устанавливаем конечную дату
            if (selectedDate < selectedDateRange.startDate) {
                // Если выбранная дата раньше начальной, меняем местами
                setSelectedDateRange({
                    startDate: selectedDate,
                    endDate: selectedDateRange.startDate
                });
            } else {
                setSelectedDateRange({
                    startDate: selectedDateRange.startDate,
                    endDate: selectedDate
                });
            }
        }
    };

    const isStartDate = (day: number | null): boolean => {
        if (!day || !selectedDateRange.startDate) return false;
        const dayDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return dayDate.toDateString() === selectedDateRange.startDate.toDateString();
    };

    const isEndDate = (day: number | null): boolean => {
        if (!day || !selectedDateRange.endDate) return false;
        const dayDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return dayDate.toDateString() === selectedDateRange.endDate.toDateString();
    };

    const isInRange = (day: number | null): boolean => {
        if (!day || !selectedDateRange.startDate || !selectedDateRange.endDate) return false;
        const dayDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return dayDate > selectedDateRange.startDate && dayDate < selectedDateRange.endDate;
    };

    const isToday = (day: number | null): boolean => {
        if (!day) return false;
        const dayDate: Date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today: Date = new Date();
        return dayDate.toDateString() === today.toDateString();
    };

    const formatSelectedDateRange = (): string => {
        if (!selectedDateRange.startDate && !selectedDateRange.endDate) {
            return t('filters:selectDate');
        }

        const formatDate = (date: Date): string => {
            const day = date.getDate();
            const monthIndex = date.getMonth();
            const lang = currentLanguage as keyof typeof translations.monthsShort;
            const monthName = translations.monthsShort[lang]?.[monthIndex] ||
                translations.monthsShort.en[monthIndex];
            return `${day} ${monthName}`;
        };

        if (selectedDateRange.startDate && !selectedDateRange.endDate) {
            return formatDate(selectedDateRange.startDate);
        }

        if (selectedDateRange.startDate && selectedDateRange.endDate) {
            const start = formatDate(selectedDateRange.startDate);
            const end = formatDate(selectedDateRange.endDate);
            return `${start} - ${end}`;
        }

        return t('filters:selectDate');
    };

    const handleApply = () => {
        const formattedText = formatSelectedDateRange();
        onApply(selectedDateRange, formattedText);
        onClose();
    };

    const handleClear = () => {
        setSelectedDateRange({ startDate: null, endDate: null });
    };

    const canApply = selectedDateRange.startDate;
    const days: (number | null)[] = getDaysInMonth(currentMonth);

    // Получаем переводы дней недели для текущего языка
    const lang = currentLanguage as keyof typeof translations.weekDays;

    const weekDays: string[] = translations.weekDays[lang] || translations.weekDays.en;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <SafeAreaView style={[modalStyles.container, { backgroundColor: colors.background.primary }]}>
                {/* Header */}
                <View style={[modalStyles.header, { backgroundColor: colors.background.primary }]}>
                    <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
                        <Ionicons name="close" size={24} color={colors.text.secondary} />
                    </TouchableOpacity>
                    <Text style={[modalStyles.title, { color: colors.text.primary }]}>{modalTitle}</Text>
                    <View style={modalStyles.placeholder} />
                </View>

                <ScrollView style={[modalStyles.scrollView, { backgroundColor: colors.background.primary }]} showsVerticalScrollIndicator={false}>
                    {/* Calendar */}
                    <View style={[
                        modalStyles.calendarContainer,
                        {
                            backgroundColor: colors.background.card,
                            shadowColor: isDark ? "transparent" : "#000",
                            shadowOffset: isDark ? { width: 0, height: 0 } : { width: 0, height: 2 },
                            shadowOpacity: isDark ? 0 : 0.05,
                            shadowRadius: isDark ? 0 : 8,
                            elevation: isDark ? 0 : 2,
                        }
                    ]}>
                        {/* Навигация по месяцам */}
                        <View style={modalStyles.calendarHeader}>
                            <TouchableOpacity
                                style={[modalStyles.navButton, { backgroundColor: colors.background.secondary }]}
                                onPress={previousMonth}
                                activeOpacity={0.7}
                            >
                                <Text style={[modalStyles.navButtonText, { color: colors.text.primary }]}>←</Text>
                            </TouchableOpacity>

                            <Text style={[modalStyles.monthYear, { color: colors.text.primary }]}>{formatMonthYear(currentMonth)}</Text>

                            <TouchableOpacity
                                style={[modalStyles.navButton, { backgroundColor: colors.background.secondary }]}
                                onPress={nextMonth}
                                activeOpacity={0.7}
                            >
                                <Text style={[modalStyles.navButtonText, { color: colors.text.primary }]}>→</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Дни недели */}
                        <View style={modalStyles.weekDaysContainer}>
                            {weekDays.map((day: string, index: number) => (
                                <View key={index} style={modalStyles.weekDayItem}>
                                    <Text style={[modalStyles.weekDayText, { color: colors.text.secondary }]}>{day}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Календарная сетка */}
                        <View style={modalStyles.calendarGrid}>
                            {days.map((day: number | null, index: number) => (
                                <DayItem
                                    key={index}
                                    day={day}
                                    isStartDate={isStartDate(day)}
                                    isEndDate={isEndDate(day)}
                                    isInRange={isInRange(day)}
                                    isToday={isToday(day)}
                                    onPress={selectDate}
                                />
                            ))}
                        </View>
                    </View>

                </ScrollView>

                {/* Action Buttons */}
                <View style={[modalStyles.buttonsContainer, { backgroundColor: colors.background.primary }]}>
                    <TouchableOpacity
                        style={[
                            modalStyles.button,
                            modalStyles.clearButton,
                            { backgroundColor: colors.background.secondary }
                        ]}
                        onPress={handleClear}
                        activeOpacity={0.7}
                    >
                        <Text style={[modalStyles.clearButtonText, { color: colors.text.primary }]}>{t('filters:clear')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            modalStyles.button,
                            modalStyles.applyButton,
                            { backgroundColor: colors.primary[500] },
                            !canApply && modalStyles.disabledButton
                        ]}
                        onPress={handleApply}
                        disabled={!canApply}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            modalStyles.applyButtonText,
                            !canApply && modalStyles.disabledButtonText
                        ]}>
                            {t('filters:apply')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

interface ModalStyles {
    container: ViewStyle;
    header: ViewStyle;
    closeButton: ViewStyle;
    title: TextStyle;
    placeholder: ViewStyle;
    scrollView: ViewStyle;
    calendarContainer: ViewStyle;
    calendarHeader: ViewStyle;
    navButton: ViewStyle;
    navButtonText: TextStyle;
    monthYear: TextStyle;
    weekDaysContainer: ViewStyle;
    weekDayItem: ViewStyle;
    weekDayText: TextStyle;
    calendarGrid: ViewStyle;
    dayItem: ViewStyle;
    rangeBoundary: ViewStyle;
    inRange: ViewStyle;
    today: ViewStyle;
    dayText: TextStyle;
    rangeBoundaryText: TextStyle;
    inRangeText: TextStyle;
    todayText: TextStyle;
    emptyDayText: TextStyle;
    buttonsContainer: ViewStyle;
    button: ViewStyle;
    clearButton: ViewStyle;
    applyButton: ViewStyle;
    disabledButton: ViewStyle;
    clearButtonText: TextStyle;
    applyButtonText: TextStyle;
    disabledButtonText: TextStyle;
}

const modalStyles = StyleSheet.create<ModalStyles>({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    closeButton: {
        padding: 8,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    calendarContainer: {
        margin: 20,
        borderRadius: 16,
        padding: 20,
    },
    calendarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    navButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    monthYear: {
        fontSize: 18,
        fontWeight: '600',
    },
    weekDaysContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    weekDayItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
    },
    weekDayText: {
        fontSize: 14,
        fontWeight: '500',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayItem: {
        width: '13.6%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        borderRadius: 8,
    },
    rangeBoundary: {
        // Цвет фона теперь применяется динамически
    },
    inRange: {
        // Цвет фона теперь применяется динамически
    },
    today: {
        // Цвет фона теперь применяется динамически
    },
    dayText: {
        fontSize: 16,
        fontWeight: "500",
    },
    rangeBoundaryText: {
        color: "white",
        fontWeight: "600",
    },
    inRangeText: {
        fontWeight: "500",
    },
    todayText: {
        fontWeight: "600",
    },
    emptyDayText: {
        color: 'transparent',
    },
    buttonsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearButton: {
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    applyButton: {
        borderWidth: 0,
    },
    disabledButton: {
        opacity: 0.5,
    },
    clearButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    disabledButtonText: {
        color: '#9ca3af',
    },
});

export { CalendarModal, type DateRange };

