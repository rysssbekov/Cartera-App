import {View, Text, ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput";
import {useState} from "react";
import {SIZES} from "../../../constants";
import CustomButton from "../../components/CustomButton";
import styles from './signupscreen.style';
import { useNavigation } from "@react-navigation/native";


const SignUpPassword = () => {

    const [password, setPassword] = useState('');
    const [passRepeat, setPassRepeat] = useState('');
    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate('Home');
    }

    return(
        <ScrollView>
            <View style={{alignItems: 'center', padding: SIZES.large, width: '100%'}}>
                <Text style={styles.title}>Регистрация</Text>
                <CustomInput
                    placeholder={"Пароль"}
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder={"Подтвердить Пароль"}
                    value={passRepeat}
                    setValue={setPassRepeat}
                    secureTextEntry
                />
                <View style={{width: '100%', margin: 225}}>
                    <CustomButton
                        text={"Продолжить"}
                        onPress={onRegisterPressed}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUpPassword;