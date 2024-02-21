import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { BookmarkIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CARTERA_API_HOST } from "../api";

export default function NewsSection({ newsProps }) {
  const navigation = useNavigation();
  const [urlList, setUrlList] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);

  // Function to format the date
  function formatDate(isoDate) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  // Hook to set the URL list
  useEffect(() => {
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  // When clicked on article it should go to details page of a news
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to toggle bookmark and save article
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Is article bookmarked???
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // Add to bookmark 
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        // Delete already bookmarked article
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.log("Error Saving/Removing Article", error);
    }
  };

  // Effect to load saved articles from AsyncStorage when the component mounts
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];

          // Check if each URL in 'urlList' exists in the bookmarked list
          const isArticleBookmarkedList = urlList.map((url) =>
            savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          );

          // Set the bookmark status for all items based on the loaded data
          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.log("Error Loading Saved Articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList]) // Include 'navigation' in the dependencies array if needed
  );

  // Component to render each item in the list
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%]shadow-sm">
          {/* Image */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  `${CARTERA_API_HOST}/uploads/${item.preview_image}`
              }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          {/* Content */}

          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text
              className="text-[#424242] uppercase max-w-[90%] font-semibold"
              style={{
                fontSize: hp(1.7),
              }}
            >
              {item.title.length > 45
                ? item.title.slice(0, 45) + "..."
                : item.title}
            </Text>

            <Text className="text-xs text-[#424242]">
              {formatDate(item.createdAt)}
            </Text>
          </View>

          {/* Bookmark */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity
              onPress={() => toggleBookmarkAndSave(item, index)}
            >
              <BookmarkIcon
                color={bookmarkStatus[index] ? "#4F97A3" : "#9FABC9"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      {/* Header */}

      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

// useEffect(() => {

//   const loadSavedArticles = async () => {
//     try {
//       const savedArticles = await AsyncStorage.getItem("savedArticles");
//       const savedArticlesArray = savedArticles
//         ? JSON.parse(savedArticles)
//         : [];

//       // Check if each URL in 'urlList' exists in the bookmarked list
//       const isArticleBookmarkedList = urlList.map((url) =>
//         savedArticlesArray.some((savedArticle) => savedArticle.url === url)
//       );

//       // Set the bookmark status for all items based on the loaded data
//       setBookmarkStatus(isArticleBookmarkedList);
//       console.log("Check if the current article is in bookmarks");
//     } catch (error) {
//       console.log("Error Loading Saved Articles", error);
//     }
//   };

//   loadSavedArticles();
// }, [urlList]);

// contentContainerStyle={{
//         paddingBottom: hp(110),
//       }}
