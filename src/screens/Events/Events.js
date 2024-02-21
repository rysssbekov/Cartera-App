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
import NewsSection from "../../components/NewsSection";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import EventsCarousel from './EventsCarousel';
import EventsSection from './EventsSection'
import { getAllArticles, getAllEvents } from "../../actions/article";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

export default function HomeScreen({navigation}) {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(true)
  const [articles, setArticles] = useState([])

  let recommendedNews = [
    {
        urlToImage: require('./1.png'),
        title: 'Однодневный семинар IELTS оффлайн/онлайн',
        publishedAt: '07 декабря 2023'
    },
    {
        urlToImage: require('./2.png'),
        title: 'ГОСТЕВАЯ ЛЕКЦИЯ: ПРИКЛАДНОЙ НЕЙРОМАРКЕТИНГ',
        publishedAt: '05 декабря 2023'
    },
    {
        urlToImage: require('./3.png'),
        title: 'ОЛИМПИАДА КБТУ ПО МАТЕМАТИКЕ 2024',
        publishedAt: '01 декабря 2023'
    },
  ]

  // Breaking News
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNewss"],
    queryFn: fetchBreakingNews,
  });

  const fetchArticles = async () => {
    const response = await getAllEvents()
    if(response.success) {
      setIsRecommendedLoading(false)
      setArticles(response.events)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  

  return (
    <SafeAreaView className=" flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <View className="9FABC9 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="9FABC9" />
          </TouchableOpacity>
        </View>
      </View>
      <View>

        <View>
            <MiniHeader label="Последние события"/>

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: hp(80),
                }}>

                {isRecommendedLoading ? (
                    <Loading />
                ) : (
                  <EventsSection
                  label="Популярные события"
                  newsProps={articles}
                  />
                )}
            </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
