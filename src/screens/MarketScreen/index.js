import { View, Text, Image, Dimensions, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Ionicons } from '@expo/vector-icons';

var { width, height } = Dimensions.get("window");


export default function FaceIdScreen() {

  const navigation = useNavigation();


  const goBack = () => {
    navigation.goBack();
  }

  const scanPress = () => {
    navigation.navigate('SuccessId')
  }

  return (
    <SafeAreaView>
        <ScrollView>
            <View className="flex-row items-center justify-between ml-2 mr-5 mt-5">
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Ionicons 
                            name="chevron-back-outline"
                            size='41'
                            color="#4F97A3"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Catalogue')}}>
                    <Image 
                        source={require('./catalogue.png')} 
                        className="w-[30px] h-[30px] mr-5"
                    />
                </TouchableOpacity>
            </View>
            <View>
                <Image 
                    source={require('./Point_right.png')}
                    className="absolute self-end w-[100px] h-[64px] top-5"    
                />
                <Image
                    className="absolute z-0 w-[153px] h-[36px] top-[50px] left-[-10px]" 
                    source={require('./bg-yellow.png')}/>
                <Text className='relative z-10 font-bold text-2xl ml-5 mt-5'>
                    ЧТО ТАКОЕ {'\n'}СКИДКИ? И ЗАЧЕМ {'\n'}ОНИ НУЖНЫ?
                </Text>
            </View>
            <View className="w-[70%] rounded-[40px] ml-5 py-5 pl-7 pr-5 bg-[#123071] mt-5">
                <Text className="  color-white">
                    Скидки для студентов — это распродажи, предлагаемые студентам в зависимости от их студенческого образования. 
                </Text>
            </View>
            <View>
                <Image 
                        source={require('./present.png')} 
                        className="absolute z-10 top-2 w-[103px] h-[195px] self-start"
                    />
                <View className="w-[80%] rounded-l-[40px] self-end py-7 pl-7 pr-5 bg-[#4F97A3] mt-10">
                    <Text className="color-white">  
                        Студенты пользуются специальными предложениями и снижают цены
                        чтобы иметь достаточно денег, чтобы позаботиться о своей учебе и расходах на проживание
                    </Text>
                </View>
            </View>
            <View className="w-[80%] rounded-r-[40px] py-7 pl-7 pr-5 bg-[#F59762] mt-10">
                <Text className="color-white font-bold">  
                    Что мне нужно, чтобы получить студенческие скидки и предложения?
                </Text>
                <Text className="color-white">  
                    Студенческие скидки и предложения для всех студентов. Необходимо только айди!
                </Text>
            
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}
