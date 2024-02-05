import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignUpCode from "../screens/SignUpScreen/SignUpCode";
import SignUpPassword from "../screens/SignUpScreen/SignUpPassword";
import ParentScreen from "../screens/ParentScreen/ParentScreen"
import NewsScreen from "../screens/News/index"
import HomeScreen from "../screens/HomeScreen";
import NewsDetailsScreen from "../screens/NewsDetails/NewsDetailsScreen";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Profile";
import { useColorScheme } from "react-native";
// import Ionicons from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"SignIn"} component={SignInScreen} />
            <Stack.Screen name={"SignUp"} component={SignUpScreen} />
            <Stack.Screen name={"SignUpCode"} component={SignUpCode} />
            <Stack.Screen name={"SignUpPassword"} component={SignUpPassword} />    
            <Stack.Screen name={"Home"} component={TabNavigator} />
            <Stack.Screen name={"News"} component={NewsScreen} />
            <Stack.Screen name={"NewsDetails"} component={NewsDetailsScreen}
                options={{animation: "slide_from_bottom"}}
            />
            <Stack.Screen name={"Search"} component={SearchScreen}/>
            <Stack.Screen name={"Parent"} component={ParentScreen} />
        </Stack.Navigator>
    )
}

const TabNavigator = () => {

    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            headerShown: false,
            tabBarStyle: {
                height: 81,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderColor: '#FFFFFF',
                backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
             },
            tabBarLabelStyle: {
                fontSize: 8,
            },
            tabBarIcon: ({ focused }) => {
                
                let iconName;

                if(route.name === 'Главная'){
                    iconName = 'home'
                } else if (route.name === 'Профиль') {
                    iconName = 'person-outline'
                }
                
                const customSize = 25;

                return(
                    <Ionicons 
                        name={iconName}
                        size={customSize}
                        color={focused ? "#2E4477" : "#8696BB"}
                    />
                )
            },
            tabBarActiveTintColor: "#2E4477",
        })}>
            <Tab.Screen name="Главная" component={HomeScreen}/>
            <Tab.Screen options={{ 
                headerShown: true, 
                headerTitle: 'ПРОФИЛЬ СТУДЕНТА',
                headerStyle: {
                    backgroundColor: '#4F97A3', 
                },
                headerTintColor: '#FFFFFF',
            }} name="Профиль" component={Feed} />
        </Tab.Navigator>
    )
}

const Navigation = () => {
    return(
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}

export default Navigation;