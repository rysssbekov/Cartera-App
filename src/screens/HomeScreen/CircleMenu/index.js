import { View, Text, Image } from "react-native"
import { COLORS } from "../../../../constants";
import { Dimensions } from "react-native";
import styles from "../homescreen.style";

const CircleMenu = () => {

    var height = Dimensions.get('window').width;

    return(
        <View style={[styles.buttons, {marginTop: height * 0.1}]}>
            <View style={{alignItems:'center'}}>
                <View style={[styles.circle, {backgroundColor: COLORS.yellow}]}>
                    <Image style={styles.icon} source={require('./../../../../assets/bell.png')} />
                </View>
                <Text style={{marginTop: 11}}>Уведомления</Text>
            </View>
            <View style={{alignItems:'center'}}>
                <View style={[styles.circle, {backgroundColor: COLORS.darkBlue}]}>
                    <Image style={styles.icon} source={require('./../../../../assets/qrcode.png')} />
                </View>
                <Text style={{marginTop: 11}}>QR</Text>
            </View>
            <View style={{alignItems:'center'}}> 
                <View style={[styles.circle, {backgroundColor: COLORS.lime}]}>
                    <Image style={styles.icon} source={require('./../../../../assets/Vector.png')} />
                </View>
                <Text style={{marginTop: 11}}>WSP</Text>
            </View>
        </View>
    )
}

export default CircleMenu;