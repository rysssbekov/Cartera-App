import {StyleSheet} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,

        alignItems: "center",
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.white
    },
    text_TERTIARY: {
        color: COLORS.primary
    }

})

export default styles;