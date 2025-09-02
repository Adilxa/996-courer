import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { SafeAreaScreenComponent } from "@/shared/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WorkDay {
  day: string;
  workHours: string;
  lunchHours: string;
  isSelected: boolean;
}

const initialSchedule: WorkDay[] = [
  {
    day: "Понедельник",
    workHours: "10:00 - 18:00",
    lunchHours: "13:00 - 14:00",
    isSelected: true,
  },
  {
    day: "Вторник",
    workHours: "10:00 - 18:00",
    lunchHours: "13:00 - 14:00",
    isSelected: true,
  },
  {
    day: "Среда",
    workHours: "10:00 - 18:00",
    lunchHours: "13:00 - 14:00",
    isSelected: true,
  },
  {
    day: "Четверг",
    workHours: "10:00 - 18:00",
    lunchHours: "13:00 - 14:00",
    isSelected: true,
  },
  {
    day: "Пятница",
    workHours: "10:00 - 18:00",
    lunchHours: "13:00 - 14:00",
    isSelected: true,
  },
  { day: "Суббота", workHours: "Выходной", lunchHours: "", isSelected: false },
  {
    day: "Воскресенье",
    workHours: "Выходной",
    lunchHours: "",
    isSelected: false,
  },
];

export default function ScheduleScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState<WorkDay[]>(initialSchedule);
  const [showWorkDaysModal, setShowWorkDaysModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [timeModalType, setTimeModalType] = useState<
    "workStart" | "workEnd" | "lunchStart" | "lunchEnd"
  >("workStart");
  const [selectedDays, setSelectedDays] = useState<string[]>([
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
  ]);
  const [workStartTime, setWorkStartTime] = useState("10:00");
  const [workEndTime, setWorkEndTime] = useState("18:00");
  const [lunchStartTime, setLunchStartTime] = useState("13:00");
  const [lunchEndTime, setLunchEndTime] = useState("14:00");
  const [showPVZDropdown, setShowPVZDropdown] = useState(false);
  const [selectedPVZ, setSelectedPVZ] = useState("ПВЗ №34");

  const pvzOptions = ["ПВЗ №34", "ПВЗ №25", "ПВЗ №26", "ПВЗ №27"];

  const timeOptions = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  const handleTimeSelect = (time: string) => {
    switch (timeModalType) {
      case "workStart":
        setWorkStartTime(time);
        break;
      case "workEnd":
        setWorkEndTime(time);
        break;
      case "lunchStart":
        setLunchStartTime(time);
        break;
      case "lunchEnd":
        setLunchEndTime(time);
        break;
    }
    setShowTimeModal(false);
  };

  const saveSchedule = () => {
    setShowWorkDaysModal(false);
    // Here you would save the schedule
  };

  return (
    <SafeAreaScreenComponent backgroundColor="#f9fafb">
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <CustomIconComponent name="chevronLeft" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("schedule:title")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* PVZ Selector */}
        <View style={styles.pvzSelectorContainer}>
          <TouchableOpacity
            style={styles.pvzSelector}
            onPress={() => setShowPVZDropdown(!showPVZDropdown)}
          >
            <CustomIconComponent name="filter" size={16} color="#6b7280" />
            <Text style={styles.pvzText}>{selectedPVZ}</Text>
            <CustomIconComponent
              name={showPVZDropdown ? "chevronUp" : "chevronDown"}
              size={16}
              color="#6b7280"
            />
          </TouchableOpacity>

          {showPVZDropdown && (
            <View style={styles.pvzDropdown}>
              {pvzOptions.map((pvz, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.pvzOption}
                  onPress={() => {
                    setSelectedPVZ(pvz);
                    setShowPVZDropdown(false);
                  }}
                >
                  <Text style={styles.pvzOptionText}>{pvz}</Text>
                  {selectedPVZ === pvz && (
                    <CustomIconComponent
                      name="success"
                      size={16}
                      color="#6366f1"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Company Info */}
        <View style={styles.companyCard}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>Technology Solutions and</Text>
            <Text style={styles.companyName}>Sustainable Development</Text>
            <Text style={styles.companyName}>Initiatives, LLC</Text>
          </View>
        </View>

        {/* Schedule Settings */}
        <View style={styles.settingsCard}>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowWorkDaysModal(true)}
          >
            <View style={styles.settingIcon}>
              <CustomIconComponent name="calendar" size={20} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t("schedule:workDays")}</Text>
              <Text style={styles.settingSubtitle}>
                {selectedDays.length}{" "}
                {selectedDays.length === 1 ? "день" : "дней"}
              </Text>
            </View>
            <CustomIconComponent
              name="chevronRight"
              size={16}
              color="#6b7280"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              setTimeModalType("workStart");
              setShowTimeModal(true);
            }}
          >
            <View style={styles.settingIcon}>
              <CustomIconComponent name="time" size={20} color="#6366f1" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t("schedule:workTime")}</Text>
              <Text style={styles.settingSubtitle}>
                {workStartTime} - {workEndTime}
              </Text>
            </View>
            <CustomIconComponent
              name="chevronRight"
              size={16}
              color="#6b7280"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => {
              setTimeModalType("lunchStart");
              setShowTimeModal(true);
            }}
          >
            <View style={styles.settingIcon}>
              <CustomIconComponent name="time" size={20} color="#10b981" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t("schedule:lunchTime")}</Text>
              <Text style={styles.settingSubtitle}>
                {lunchStartTime} - {lunchEndTime}
              </Text>
            </View>
            <CustomIconComponent
              name="chevronRight"
              size={16}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
          <Text style={styles.saveButtonText}>{t("common:save")}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Work Days Modal */}
      <Modal
        visible={showWorkDaysModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowWorkDaysModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowWorkDaysModal(false)}>
                <Text style={styles.modalCancel}>{t("common:cancel")}</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t("schedule:selectDays")}</Text>
              <TouchableOpacity onPress={saveSchedule}>
                <Text style={styles.modalSave}>{t("common:save")}</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.daysContainer}>
              {initialSchedule.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dayItem}
                  onPress={() => {
                    if (selectedDays.includes(item.day)) {
                      setSelectedDays(
                        selectedDays.filter((d) => d !== item.day)
                      );
                    } else {
                      setSelectedDays([...selectedDays, item.day]);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.dayCheckbox,
                      selectedDays.includes(item.day) &&
                        styles.dayCheckboxSelected,
                    ]}
                  >
                    {selectedDays.includes(item.day) && (
                      <CustomIconComponent
                        name="success"
                        size={16}
                        color="#ffffff"
                      />
                    )}
                  </View>
                  <Text style={styles.dayText}>{item.day}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Time Modal */}
      <Modal
        visible={showTimeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTimeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                <Text style={styles.modalCancel}>{t("common:cancel")}</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{t("schedule:selectTime")}</Text>
              <View style={{ width: 60 }} />
            </View>

            <ScrollView style={styles.timeContainer}>
              {timeOptions.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.timeItem}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text style={styles.timeText}>{time}</Text>
                  {((timeModalType === "workStart" && time === workStartTime) ||
                    (timeModalType === "workEnd" && time === workEndTime) ||
                    (timeModalType === "lunchStart" &&
                      time === lunchStartTime) ||
                    (timeModalType === "lunchEnd" &&
                      time === lunchEndTime)) && (
                    <CustomIconComponent
                      name="success"
                      size={16}
                      color="#6366f1"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaScreenComponent>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pvzSelectorContainer: {
    marginBottom: 20,
  },
  pvzSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pvzDropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pvzOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  pvzOptionText: {
    fontSize: 16,
    color: "#111827",
  },
  pvzText: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },
  companyCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  logoContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#6366f1",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  logoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 18,
  },
  settingsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  saveButton: {
    backgroundColor: "#6366f1",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 40,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  modalCancel: {
    fontSize: 16,
    color: "#6b7280",
  },
  modalSave: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6366f1",
  },
  daysContainer: {
    padding: 20,
  },
  dayItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  dayCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dayCheckboxSelected: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  dayText: {
    fontSize: 16,
    color: "#111827",
  },
  timeContainer: {
    padding: 20,
  },
  timeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 16,
    color: "#111827",
  },
});
