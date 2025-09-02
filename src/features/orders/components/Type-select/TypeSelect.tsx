import { CustomIconComponent } from "@/shared/assets/icons/settings/CustomIconComponent";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { selectTypes, Types } from "../../constants";


interface TypeSelectProps {
    types: Types | null;
    setType: (type: Types) => void;
}


export const TypeSelect: React.FC<TypeSelectProps> = ({ types, setType }) => {

    const onSelectType = (type: Types) => {
        setType(type);
    }

    return (
        <View style={styles.container}>
            {
                selectTypes.map((type) => (
                    <TouchableOpacity style={[styles.element, types?.type === type.type && styles.elementActive]} key={type.type} onPress={() => onSelectType(type)}>
                        <CustomIconComponent name={type.type} size={32} color={types?.type === type.type ? "white" : "black"} />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    element: {
        width: "22%",
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    elementActive: {
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
    },
})