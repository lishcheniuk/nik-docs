import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../lib/theme";

export const AppButton = ({ label, renderIcon, onPress, style = {} }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress?.()}
            activeOpacity={0.5}
            style={[styles.button, style]}
        >
            {renderIcon && renderIcon()}
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#ffffff",
    },
});
