import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Loading from "../../components/Loading"
import Header from "../../components/Header"
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../../utils/NewsApi";
import MiniHeader from "../../components/MiniHeader";
import BreakingNews from "../../components/BreakingNews";
import NewsSection from "../../components/NewsSection";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function HomeScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [recommendedNews, SetRecommendedNews] = useState([])
  
  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
  });

  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recomendedNews"],
    queryFn: fetchRecommendedNews,
  });

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />

      <View>
        {/* Header */}
        <Header />

        {/* Breaking News */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View className="">
            <MiniHeader label="Breaking News" />
            <BreakingNews label="Breaking News" data={data.articles} />
          </View>
        )}

        <View>
            <MiniHeader label="Последние новости"/>

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: hp(80),
                }}>

                {isRecommendedLoading ? (
                    <Loading />
                    ) : (
                    <NewsSection
                    label="Последние новости"
                    newsProps={recommendedNew.articles}
                    />
                )}   
            </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
