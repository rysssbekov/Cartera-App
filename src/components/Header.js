import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function Header({search = true}) {
    
    const navigation = useNavigation();
    const {colorScheme, toggleColorScheme} = useColorScheme();

    return (
        <View className="flex-row justify-between items-center mx-4 mt-4">
            <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    className="bg-gray-200 rounded-full p-2"
                >
                <ArrowLeftIcon/>
            </TouchableOpacity>
            {search ? (
                <TouchableOpacity 
                    onPress={() => navigation.navigate("Search")}
                    className="bg-gray-200 rounded-full p-2"
                >
                    <MagnifyingGlassIcon/>
                </TouchableOpacity>
            ) : (
                <View />
            )}
        </View>
    )
}
