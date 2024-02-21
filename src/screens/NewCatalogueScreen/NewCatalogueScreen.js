import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'

export default function NewCatalogueScreen() {

  const width = Dimensions.get('window')

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="items-center mt-14">
          <Image 
            source={require('./spotify.png')}
            className="h-[183px] w-[320px]"
          />
          <View className="bg-white w-[320px] relative top-[-20] pl-5 pt-2 rounded-b-[20px]">
            <Text className="font-bold">Акция на подписку Spotify</Text>
            <Text className="text-[11px]">Spotify Premium за 50% от обычной стоимости</Text>
            <View className='flex-row items-center self-end pr-5 gap-2 mt-1 mb-3 '>
              <Text className="color-[#D95151] font-bold text-[14px] ">547</Text>
              <Image className='w-[22px] h-[20px]' source={require('./heart.png')}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}