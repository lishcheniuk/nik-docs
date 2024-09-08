import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useAppLocale } from "../../hooks/useAppLocale";

const { width: windowWidth } = Dimensions.get("window");
const maskSize = 300;
const borderMaskWidth = 6;

export const CameraMask = () => {
    const { trans } = useAppLocale();

    return (
        <>
            <View style={styles.titleWrap}>
                <Text style={[styles.title, { fontSize: 22, fontWeight: "700" }]}>
                    {trans("Scanning")}
                </Text>
                <Text style={[styles.title, { fontSize: 18, marginTop: 50 }]}>
                    {trans("To receive documents, point the camera at the barcode or QR code")}
                </Text>
            </View>
            <View style={StyleSheet.absoluteFillObject}>
                <View style={[{ flex: 1 }, styles.maskRow, styles.maskFrame]} />
                <View style={[styles.maskCenter]}>
                    <View style={[{ flex: 1 }, styles.maskFrame]} />
                    <View style={styles.maskInner}>
                        <View
                            style={[
                                styles.maskInnerBorder,
                                {
                                    left: 0,
                                    top: 0,
                                    borderTopWidth: borderMaskWidth,
                                    borderLeftWidth: borderMaskWidth,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.maskInnerBorder,
                                {
                                    right: 0,
                                    top: 0,
                                    borderTopWidth: borderMaskWidth,
                                    borderRightWidth: borderMaskWidth,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.maskInnerBorder,
                                {
                                    left: 0,
                                    bottom: 0,
                                    borderBottomWidth: borderMaskWidth,
                                    borderLeftWidth: borderMaskWidth,
                                },
                            ]}
                        />
                        <View
                            style={[
                                styles.maskInnerBorder,
                                {
                                    right: 0,
                                    bottom: 0,
                                    borderBottomWidth: borderMaskWidth,
                                    borderRightWidth: borderMaskWidth,
                                },
                            ]}
                        />
                    </View>
                    <View style={[{ flex: 1 }, styles.maskFrame]} />
                </View>
                <View style={[{ flex: 1 }, styles.maskRow, styles.maskFrame]} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    titleWrap: {
        position: "absolute",
        top: 70,
        left: windowWidth / 2 - 170,
        width: 340,
        alignItems: "center",
        zIndex: 10,
    },
    title: {
        color: "#ffffff",
        textAlign: "center",
    },
    maskInner: {
        width: maskSize,
        backgroundColor: "transparent",
        // borderColor: "#ffffff",
        // borderWidth: 1,
    },
    maskFrame: {
        backgroundColor: "rgba(1,1,1,0.6)",
    },
    maskRow: {
        width: "100%",
    },
    maskCenter: {
        flexDirection: "row",
        height: maskSize + 2,
    },
    maskInnerBorder: {
        position: "absolute",
        borderColor: "#ffffff",
        width: 50,
        height: 50,
    },
});
