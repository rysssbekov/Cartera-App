import { View, Text } from 'react-native'
import React from 'react'

export default function MiniHeader({ label }) {
  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
      <Text className="text-base color-[#888888] font-bold">{label}</Text>
      <Text className="text-md font-semibold text-gray-600" >Посмотреть всё</Text>
    </View>
  )
}