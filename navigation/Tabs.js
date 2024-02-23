import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import TV from "../screens/TV";
import {useColorScheme} from "react-native";
import {GRAY_COLOR_DARK, GRAY_COLOR_LIGHT, NAV_BACKGROUND_DARK, YELLOW_COLOR_DARK, YELLOW_COLOR_LIGHT} from "../colors";
import {Ionicons} from "@expo/vector-icons"

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (<Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: isDark ? NAV_BACKGROUND_DARK : 'white',
        }}
        screenOptions={{
            unmountOnBlur: true, // caching 이 적용되는 부분이 있다면 해당 페이지의 cache 를 비운다
            headerShown: false,
            tabBarStyle: {
                backgroundColor: isDark ? NAV_BACKGROUND_DARK : 'white',
            },
            tabBarActiveTintColor: isDark ? YELLOW_COLOR_LIGHT : YELLOW_COLOR_DARK,
            tabBarInactiveTintColor: isDark ? GRAY_COLOR_LIGHT : GRAY_COLOR_DARK,
            headerStyle: {
                backgroundColor: isDark ? NAV_BACKGROUND_DARK : 'white',
            },
            headerTitleStyle: {
                color: isDark ? 'white' : NAV_BACKGROUND_DARK,
            },
            tabBarLabelStyle: {
                marginBottom: 2,
                marginTop: -5,
                fontSize: 12,
                fontWeight: "600"
            }
        }}>
        <Tab.Screen
            name="Movie"
            component={Movie}
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name={focused ? "film" : "film-outline"} color={color} size={size}/>
                ),
            }}
        />
        <Tab.Screen
            name="TV"
            component={TV}
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name={focused ? "tv" : "tv-outline"} color={color} size={size}/>
                ),
            }}
        />
        <Tab.Screen
            name="Search"
            component={Search}
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name={focused ? "search" : "search-outline"} color={color} size={size}/>
                ),
            }}
        />
    </Tab.Navigator>);
}

export default Tabs;
