import { View, Text, Image, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import styles from './catalogue.style'
import CategoryScreen from './../Category/Category';
import NewCatalogueScreen from '../NewCatalogueScreen/NewCatalogueScreen'

export default function Catalogue() {

    const navigator = useNavigation();
    const Category = ["Категории", "Скидки", 'Новинки', 'Прочее']
    const [activeCategory, setActiveCategory] = useState('Категории')

  return (
    <View>
        <ScrollView>
        <ImageBackground 
            source={require('./bg.png')} 
            resizeMode='cover'
            className="h-[200px]"
        > 
            <View className="flex-row justify-between mx-5 mt-14">
                <TouchableOpacity onPress={() => {navigator.navigate('Главная')}}>
                    <Image
                        className="w-[28px] h-[28px] ml-2" 
                        source={require('./Line/grid-layout.png')}
                    />
                </TouchableOpacity>
                <Image 
                    className="w-[28px] h-[28px] mr-2"
                    source={require('./notification.png')} 
                />
            </View>
            <View className="flex-row justify-center">
                <TouchableOpacity 
                    onPress={() => navigator.navigate("Search")}
                    className="bg-gray-200 rounded-full p-2 w-[80%] mt-5 flex-row items-center"
                >
                    <MagnifyingGlassIcon color="#949EB6"/>
                    <Text className="font-medium text-lg color-[#8696BB] ml-3">Поиск</Text>
                </TouchableOpacity>
            </View>
            <View className="relative top-6 pl-5 z-10">
                <FlatList data={Category}
                renderItem = {( { item }) => (
                    <TouchableOpacity
                        style={styles.tab(activeCategory, item)}
                        onPress={() => {
                            setActiveCategory(item);
                            navigator.navigate(`${item}`)    
                        }}
                    >
                        <Text style={styles.tabText(activeCategory, item)}>{item}</Text>

                    </TouchableOpacity>
                )}
                keyExtractor={item => item}
                contentContainerStyle={{ columnGap: 10}}
                horizontal
                showsHorizontalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
        <View>
            {
                activeCategory === 'Категории' && <CategoryScreen />
            }
            {
                activeCategory === 'Новинки' && <NewCatalogueScreen />  
            }
        </View>
        </ScrollView>
    </View>
    
    
  )
}