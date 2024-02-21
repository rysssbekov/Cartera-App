import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { useState, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function SubscriptionDetail() {
    

    const width = Dimensions.get('window')
    const route = useRoute();
    const navigation = useNavigation();
    const [textShown, setTextShown] = useState(false); 
    const [lengthMore,setLengthMore] = useState(false);

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }
    const { item } = route.params;
    
    const onTextLayout = useCallback(e =>{
        setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
        // console.log(e.nativeEvent);
    },[]);

  return (
    <ScrollView>
        <View>
            <Image className="w-[100%] h-[350px]" source={item.img}/>
                <View className="absolute flex-row justify-between top-16 pl-5"
                    style={{gap: 250}}
                > 
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Image className=" w-[42px] h-[37px]" source={require('./goBack.png')}/>
                    </TouchableOpacity>
                    <Image className="w-[42px] h-[37px]" source={require('./like.png')}/> 
                </View>
                <View className='bg-white rounded-t-[20px] pt-10 relative z-10 top-[-20] pl-5 pb-[500px]'>
                    <Text className="text-2xl w-[90%] font-bold">
                        {item.description}
                    </Text>
                    <View className="flex-row items-center gap-3 mt-1 mb-5">
                        <Image source={require('./star.png')}/>
                        <Text className="font-bold">5.0</Text>
                        <Text className="color-[#BDBDBD]">(2343 просмотров)</Text>
                    </View>
                    <View>
                        <Text
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? undefined : 4}
                            style={{ lineHeight: 21, width: '85%' }}>
                                {item.paragraph}
                            </Text>

                            {
                                lengthMore ? <Text
                                onPress={toggleNumberOfLines}
                                className={'color-[#5264BF]'}
                                style={{ lineHeight: 21, marginTop: 10 }}>{textShown ? 'Уменьшить текст...' : '...Читать полностью'}</Text>
                                :null
                            }
                    </View>
                </View>
            
        </View>
    </ScrollView>
  )
}