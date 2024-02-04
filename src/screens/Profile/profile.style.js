import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',  
    },
    header: {
        paddingTop: 85,
        backgroundColor: COLORS.primary,
        paddingBottom: 14,
    },
    headerTitle: {
        fontSize: 20,
        color: COLORS.white,
        fontWeight: 'bold'
    },
    avatar: {
        width: 89,
        height: 93, 
        marginTop: 17,
    },
    edit:{
        width: 24,
        height: 22,
        position: "relative",
        top: -20,
        left: 65
    }

})

export default styles;