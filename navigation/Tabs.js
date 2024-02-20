import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import {useColorScheme} from "react-native";
import {GRAY_COLOR_DARK, GRAY_COLOR_LIGHT, NAV_BACKGROUND_DARK, YELLOW_COLOR_DARK, YELLOW_COLOR_LIGHT} from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (<Tab.Navigator
        initialRouteName="Search"
        screenOptions={{
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
            }
        }}>
        <Tab.Screen name="Movie" component={Movie}/>
        <Tab.Screen name="Tv" component={Tv}/>
        <Tab.Screen name="Search" component={Search}/>
    </Tab.Navigator>);
}

export default Tabs;
