import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Movie from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import {View, Text} from "react-native";

const Tab = createBottomTabNavigator();
const tabOption = {
    tabBarActiveBackgroundColor : '#eee'
};

const Tabs = () => <Tab.Navigator
    initialRouteName="Search"
    screenOptions={{
        tabBarLabelStyle: {
            backgroundColor: '#ffff00',
        },
        tabBarActiveBackgroundColor : '#eee',
        tabBarActiveTintColor : '#000',
        tabBarLabelPosition: 'beside-icon'
    }}>
    <Tab.Screen name="Movie" component={Movie}
                options = {tabOption}/>
    <Tab.Screen name="Tv" component={Tv}
                options = {{
                    tabBarBadge: 'hello',
                    headerRight: () =>
                        <View>
                            <Text>hello</Text>
                        </View>
                }}/>
    <Tab.Screen name="Search" component={Search}/>
</Tab.Navigator>

export default Tabs;
