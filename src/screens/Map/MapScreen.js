import WebView from "react-native-webview"
import { useGlobalUserState } from "../../stores/user"
import Header from "../../components/Header";
import { ActivityIndicator, Dimensions, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { toBinary } from "../../utils";
import { useState } from "react";
import Map from './Map'
const MapScreen = ({navigation, route}) => {
    return (
        <SafeAreaView className="flex flex-col flex-1 bg-white dark:bg-neutral-900">
            <View className="w-full flex-row justify-between items-center px-4 py-2 mt-10 bg-white">
                <View className="9FABC9 p-2 rounded-full items-center justify-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={25} strokeWidth={3} color="9FABC9" />
                    </TouchableOpacity>
                </View>
            </View>
            <Map route={route} navigation={navigation} />
        </SafeAreaView>
    )
}

export default MapScreen