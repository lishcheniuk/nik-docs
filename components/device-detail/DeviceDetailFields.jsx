import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { deviceTypes } from "../../lib/constants";
import { Colors } from "../../lib/theme";
import { useAppLocale } from "../../hooks/useAppLocale";

export const DeviceDetailFields = ({
    deviceDocs,
    deviceClass,
    deviceNumber,
    deviceYear,
    onDownloadDocument,
}) => {
    const { device_type } = deviceDocs?.[0] || {};
    const { trans } = useAppLocale();

    const deviceFields = [
        {
            label: "Type",
            value: trans(deviceTypes[device_type] || "Unknown device"),
        },
        {
            label: "Class",
            value: deviceClass,
        },
        {
            label: "Serial number",
            value: deviceNumber,
        },
        {
            label: "Year of manufacture",
            value: deviceYear,
        },
    ];

    return (
        <ScrollView
            style={{ padding: 15 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
        >
            <View>
                <Text style={styles.title}>{trans("Device")}</Text>
                <View style={styles.info}>
                    {deviceFields.map((item) => (
                        <View key={item.label} style={styles.infoItem}>
                            <Text style={{ color: "gray" }}>{trans(item.label)}</Text>
                            <Text>{item.value}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={styles.title}>{trans("Documents")}</Text>
                <View style={{ gap: 10 }}>
                    {(deviceDocs || []).map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => onDownloadDocument(item.filename, item.doc_data)}
                        >
                            <View style={styles.docItem}>
                                <View style={{ flex: 1 }}>
                                    <Text>{trans(item.verbose_names.ENG)}</Text>
                                    <Text style={{ fontSize: 12, color: "gray" }}>
                                        {item.gen_date}
                                    </Text>
                                </View>
                                <View>
                                    <FontAwesome name='download' size={22} color='black' />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    info: {
        backgroundColor: Colors.bgColor,
        borderRadius: 10,
        padding: 15,
        gap: 20,
    },
    infoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    docItem: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.bgColor,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        marginBottom: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
});
