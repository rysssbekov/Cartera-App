import { View, Text, TextInput } from "react-native";
import styles from './custominput.style'
import {COLORS} from "../../../constants";

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
    return(
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                style={styles.input}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={COLORS.gray}
            />
        </View>
    )
}

export default CustomInput;