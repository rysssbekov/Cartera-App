import { View, Image, ScrollView, Text, ActivityIndicator, Dimensions} from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { CARTERA_API_HOST } from '../../api';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import WebView from 'react-native-webview';

const { height, width } = Dimensions.get("window");


const htmlPrepend = (main_image, title) => `
<!doctype html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title></title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: "Roboto", sans-serif;
    }
  </style>
  <meta name="description" content="">

  <meta property="og:title" content="">
  <meta property="og:type" content="">
  <meta property="og:url" content="">
  <meta property="og:image" content="">

  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="icon.png">

  <link rel="manifest" href="site.webmanifest">
  <meta name="theme-color" content="#fafafa">
</head>
<body>
<div class="wrapper">
<img width="100%" src="${CARTERA_API_HOST}/uploads/${main_image}">
<h1>${title}</h1>
<div class="content">
`
const htmlAppend = `
</div>
</div>
</body>
</html>
`

export default function EventDetail({}) {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    console.log(item)
  return (
    <>
        <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
            <View className="9FABC9 p-2 rounded-full items-center justify-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size={25} strokeWidth={3} color="9FABC9" />
            </TouchableOpacity>
            </View>
        </View>
        <WebView
            source={{ html: htmlPrepend(item.main_image, item.title) + item.content + htmlAppend }}
            onLoadStart={() => setVisible(true)}
            onLoadEnd={() => setVisible(false)}
        />

        {visible && (
            <ActivityIndicator
            size={"large"}
            color={"4F97A3"}
            style={{
                position: "absolute",
                top: height / 2,
                left: width / 2,
            }}
            />
        )}
        <View className="flex-row justify-center text-center my-5">
            <TouchableOpacity className=" bg-[#4F97A3] py-3 px-20 rounded-[10px]">
                <Text className="color-white  font-bold text-[20px] ">Оставить заявку </Text>
            </TouchableOpacity>
        </View>
    </>
  )
}