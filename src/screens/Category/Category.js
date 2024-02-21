import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get('window')

export default function Category() {

  const navigation = useNavigation();

  return (
    <View className="justify-center items-center gap-5 mt-5">
      <TouchableOpacity onPress={() => {navigation.navigate('Subscription')}}>
        <Image style={{width: width*0.8, height: height*0.13}} source={require('./1.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
       <Image style={{width: width*0.8, height: height*0.13}} source={require('./2.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={{width: width*0.8, height: height*0.13}} source={require('./3.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image style={{width: width*0.8, height: height*0.13}} source={require('./4.png')} />
      </TouchableOpacity>
    </View>
  )
}