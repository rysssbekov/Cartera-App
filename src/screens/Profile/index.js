import {View, Text, Image, Dimensions, ScrollView, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
import MiniHeader from '../../components/MiniHeader';


const Profile = () => {
    
    var {width, height} = Dimensions.get('window').width;

    return(
            <ScrollView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
                <View>
                    <View className="items-center my-4">
                        <Image source={require("./wrapper.png")}
                            style={{ width: hp(12), height: hp(12.5) }}
                            resizeMode="cover"
                            className="rounded-lg"
                        />
                        <Text className="text-xl font-semibold mt-4">Батыр Султан</Text>
                        <Text className="mt-2">2 курс</Text>
                        <Text className="mt-2">Data science, ИС</Text>
                        <TouchableOpacity
                            className="relative bg-[#3CAE8B] bg-cover py-5 px-10 rounded-xl mt-5" 
                        >
                            <Text className="color-white text-xl font-semibold">Редактировать профиль</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View className="items-center ">
                        <View className="bg-white w-[90%] pl-5 rounded-xl" >
                            <Text className="text-lg color-[#7285A5] font-bold ">Персональные данные</Text>    
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
    )  
}

export default Profile;