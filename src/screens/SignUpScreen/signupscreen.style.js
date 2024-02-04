import {StyleSheet} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.black,
        margin: 60,
        marginBottom: 30
    },
    link: {
        color: COLORS.primary
    }
});

export default styles;