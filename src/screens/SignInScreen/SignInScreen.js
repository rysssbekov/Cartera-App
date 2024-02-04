import { View, Text, ScrollView, ImageBackground } from "react-native";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import { COLORS, SIZES } from "../../../constants";
import CustomButton from "../../components/CustomButton";
import styles from "../SignUpScreen/signupscreen.style";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const onSignInPressed = () => {
    navigation.navigate("Home");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };    

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  return (
    <ScrollView style={{flex:1, backgroundColor: COLORS.white}}>
      <View style={{alignItems: "center", padding: SIZES.large}}>
            <Text style={styles.title}>Вход</Text>
            <CustomInput
              placeholder={"Телефон или почта"}
              value={login}
              setValue={setLogin}
            />
            <CustomInput
              placeholder={"Пароль"}
              value={password}
              setValue={setPassword}
              secureTextEntry
            />
            <View style={{ width: "100%", marginTop: 125 }}>
              <CustomButton text={"Войти"} onPress={onSignInPressed} />
              <CustomButton
                text={"Зарегистрироваться"}
                onPress={onSignUpPressed}
                type={"TERTIARY"}
              />
            </View>
        </View>
      </ScrollView>
);
};

export default SignInScreen;
