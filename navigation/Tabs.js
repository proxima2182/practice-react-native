import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import {useColorScheme} from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return (<Tab.Navigator
        initialRouteName="Search">
        <Tab.Screen name="Movie" component={Movie}/>
        <Tab.Screen name="Tv" component={Tv}/>
        <Tab.Screen name="Search" component={Search}/>
    </Tab.Navigator>);
}

export default Tabs;
