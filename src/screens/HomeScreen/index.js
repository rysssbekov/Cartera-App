import {Text, View, Image, ScrollView} from "react-native";
import styles from "./homescreen.style";
import { Dimensions } from "react-native";
import CircleMenu from "./CircleMenu";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useGlobalUserState } from "../../stores/user";


const Home = () => {
    const userState = useGlobalUserState()
    const user = userState.get()
    const userObj = user.user

    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').width;

    const navigation = useNavigation();
    const onNewsPressed = () => {
        navigation.navigate("News");
    };

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>СТУДЕНТ</Text>
                </View>
                <View style={styles.profile}>
                    <View style={styles.profileUpper}> 
                        <Image style={styles.avatar} source={require("./../../../assets/ava.png")}/>
                        <View>
                            <Text style={styles.name}>{userObj.firstname}</Text>
                            <Text style={styles.name}>{userObj.lastname}</Text>
                        </View>
                    </View>
                    <View style={styles.profileDetails}>
                        <View style={styles.profileInner}>
                            <Text style={{marginBottom: 5}}>Курс: 2</Text>
                            <Text style={{marginBottom: 5}}>Специальность: Data Science</Text>
                            <Text>Факультет: ИС</Text>
                        </View>
                        <Image style={styles.dimension}source={require('./../../../assets/arrow-right.svg')}/>
                    </View>
                </View>
                <View style={styles.lines}>
                    <View style={styles.active}></View>
                    <View style={styles.dot}></View>
                </View>
                
                <CircleMenu />
        
                <View style={[styles.menu, {width: width, marginTop: height * 0.1}]}>
                    <View style={[styles.upper, {width: width}]}>
                        <TouchableOpacity onPress={() => navigation.navigate("Unix")}>
                            <Image style={styles.menuLargeDimension} source={require('./../../../assets/unix.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                            <Image style={styles.menuDimension} source={require('./../../../assets/map.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.lower, {width: width}]}>
                        <TouchableOpacity onPress={() => onNewsPressed('news')}>
                            <Image style={styles.menuDimension} source={require('./../../../assets/News.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {navigation.navigate('Market')}}>
                            <Image style={styles.menuDimension} source={require('./../../../assets/Discount.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                            <Image style={styles.menuDimension} source={require('./../../../assets/events.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Home;
