import {
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    Text,
    View,
  } from "react-native";
  import React from "react";
  import { LinearGradient } from "expo-linear-gradient";
  
  var { width, height } = Dimensions.get("window");
  
  export default function BreakingNewsCard({ item, handleClick }) {
    return (
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View className="relative">
          <Image
            source={require('./event.png')}
            style={{
              width: width * 0.8,
              height: height * 0.22,
            }}
            resizeMode="cover"
            className="rounded-3xl"
          />
  
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
            }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
  
          {/* Title and Author */}
          <View className="absolute bottom-6 left-4 justify-end h-[80%]">
            <View className=" space-y-1">
              <View className=" max-w-[100%]">
                <Text className="color-white">07 декабря 2023</Text>
                <Text className="text-white text-base font-semibold capitalize">
                    KAZ CODE YOUTUBE CHALLENGE
                </Text>
              </View>
  

            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  