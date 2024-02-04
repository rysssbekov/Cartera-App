import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 7,
    },
    input: {
        fontSize: 16,
        paddingVertical: 13,
    }
})

export default styles;