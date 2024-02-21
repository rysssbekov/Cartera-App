import { View, Text, ScrollView, ImageBackground, Image, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import SubscriptionDetail from './SubscriptionDetail';

export default function Subscription() {

    const navigation = useNavigation();

    const data = [
        {
            img: require('./1.png'),
            company: 'NETFLIX',
            description: 'NETFLIX: скидки для студентов на подписку',
            paragraph: `Netflix, популярнейшая платформа для просмотра фильмов и сериалов, предлагает специальную скидку для всех студентов. Теперь вы можете наслаждаться всеми преимуществами Netflix по выгодной цене! 
            \nСтуденты, подписавшиеся на Netflix, получат доступ к тысячам фильмов и сериалов в одном месте. Это идеальный способ расслабиться и отдохнуть после напряженного учебного дня. Смотрите свои любимые шоу, открывайте для себя новые фильмы и наслаждайтесь большим выбором контента.
            \nЧто касается скидки, все студенты могут получить доступ к Netflix всего за XX% от обычной цены подписки. Это отличная возможность сэкономить и наслаждаться развлечениями вместе с друзьями.
            \nЧтобы воспользоваться этой специальной скидкой, вам просто нужно зарегистрироваться на Netflix, используя свою студенческую электронную почту и подтвердить свой статус студента. После проверки, вы получите доступ к Netflix со скидкой для студентов.`,  
            likes: 352
        },
        {
            img: require('./2.png'),
            company: 'Amazon Prime',
            description: 'Бесплатная доставка с Amazon Prime',
            likes: 500
        },
        {
            img: require('./3.png'),
            company: 'Apple Music',
            description: 'Apple Music: стоимость в половину подписки',
            likes: 748
        },
        {
            img: require('./4.png'),
            company: 'Adobe Creative Cloud',
            description: 'Делай дизайн с Adobe Creative Cloud',
            likes: 999
        },
    ]

  return (
    <View>
      <ScrollView>
        <ImageBackground 
            source={require('./bg.png')}
            className="h-[255px]"
        >
            <SafeAreaView>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Image 
                        source={require('./left-arrow.png')}
                        className={'w-[41px] h-[37px] ml-5'}
                    />
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
        <View className="ml-5 mt-5 border-b-[0.5px] w-[90%] pb-7 border-[#98A1BD]">
            <Text className="font-semibold text-2xl">
                ЦИФРОВЫЕ ПОДПИСКИ
            </Text>
            <Text className="text-md mb-5">
                45 доступных скидок
            </Text>
            <Text className="w-[90%]">
                Цифровые подписки для студентов позволяют получить доступ к популярным сервисам по более доступным ценам.
            </Text>
            <View className="flex-row items-center gap-3 mt-3">
                <Image 
                    source={require('./heart.png')} 
                    className={'w-[20px] h-[18px]'}
                />
                <Text className="color-[#6CB0BC] font-bold">1536 избранных</Text>
            </View>
        </View>
        <View>
            <Text className="font-bold text-2xl ml-5 mt-5">Список Скидок</Text>
            <View className="ml-5">
                <FlatList 
                    data={data}
                    renderItem={( { item }) => (
                        <TouchableOpacity   
                            className="max-w-[175px]"
                            onPress={() => {navigation.navigate('SubscriptionDetail', {item: item})}}
                        >
                            <Image
                                className={'h-[125px] w-[175px]'} 
                                source={item.img}
                            />
                            <View 
                                className={'bg-white pt-2 pl-3 pr-5 relative top-[-20] rounded-b-[20px]'}>
                                <Text className={'text-[11px]'}>{item.description}</Text>
                                <View className="flex-row items-center self-end pr-3 mt-1 mb-3">
                                    <Text className="color-[#D95151]">{item.likes}</Text>
                                    <Image 
                                        source={require('./red-heart.png')}
                                        className="w-[14px] h-[9px]"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>    
                    )}
                    keyExtractor={item => item.company}
                    columnWrapperStyle={{columnGap: 10}}
                    numColumns={2}
                />
                {/* <FlatList data={Category}
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
                /> */}
            </View>
        </View>
      </ScrollView>
    </View>
  )
}