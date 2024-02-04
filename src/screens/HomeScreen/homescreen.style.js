import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        fontSize:25, 
        alignItems: "center", 
        marginTop: height * 0.1
    },
    card: {
        backgroundColor: COLORS.primary, 
        borderTopLeftRadius: 40, borderTopRightRadius: 40, minWidth: 320,
        height: 52,
        width: width * 0.9
    },
    cardTitle: {
        color: COLORS.white, 
        fontSize: 20, 
        fontWeight: "bold", 
        paddingLeft: 25, 
        paddingTop: 15
    },
    profile: {
        backgroundColor: "#FFFFFF", 
        minWidth:320, paddingTop: 13, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, width: width * 0.9
    },
    profileUpper: {
        display: "flex", flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F7FB', borderRadius: 40, marginHorizontal: 20, padding: 10, gap: 20
    },
    avatar: {
        height: 56, width: 62
    },
    name: {
        fontSize: 15, fontWeight: "600"
    },
    profileDetails: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: width * 0.08
    },
    profileInner: {
        fontSize: 10, 
        marginBottom: 18
    },
    dimensions:{
        height:25, 
        width: 23, 
        marginTop: '-5px'
    },
    lines: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5, 
        marginTop: 20, 
        marginLeft: 20
    },
    active: {
        width: 16, 
        backgroundColor: '#272727',
        borderRadius: 6, 
        height: 6
    },
    dot: {
        width: 6, 
        height: 6, 
        backgroundColor: '#D9D9D9', 
        borderRadius: '100%'
    },
    buttons: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 11
    },
    circle: {
        width: 73, 
        height: 73, 
        borderRadius: 100, 
        display: 'flex', 
        justifyContent: "center", 
        alignItems: 'center'
    },
    icon: {
        width: 24, 
        height: 24
    },
    menu: {
        backgroundColor: '#FFFFFF', 
        paddingTop: 40, 
        borderTopLeftRadius: 40, 
        borderTopRightRadius: 40, 
        paddingBottom: 22
    },
    menuLargeDimension: {
        width: 210, 
        height: 100,
    },
    menuDimension: {
        width: 100, 
        height: 100,
    },
    upper: {
        display: 'flex', 
        flexDirection: 'row', 
        gap: 10, 
        justifyContent: 'center'
    },
    lower: {
        display: "flex", 
        flexDirection: 'row', 
        gap: 12, 
        justifyContent: 'center', 
        marginTop: 10
    },
})

export default styles;