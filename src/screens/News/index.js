import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
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
import { getAllArticles } from "../../actions/article";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

export default function HomeScreen({navigation}) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [recommendedNews, SetRecommendedNews] = useState([])
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(true)
  const [articles, setArticles] = useState([])
  
  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
  });

  const fetchArticles = async () => {
    const response = await getAllArticles()
    if(response.success) {
      setIsRecommendedLoading(false)
      setArticles(response.articles)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  // const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
  //   queryKey: ["recomendedNews"],
  //   queryFn: fetchRecommendedNews,
  // });

  return (
    <View className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
        <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
          <View className="9FABC9 p-2 rounded-full items-center justify-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeftIcon size={25} strokeWidth={3} color="9FABC9" />
            </TouchableOpacity>
          </View>
        </View>

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
                    newsProps={articles}
                    />
                )}   
            </ScrollView>
      </View>
    </View>
  );
}
