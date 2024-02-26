import React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import {NAV_BACKGROUND_DARK} from "../colors";
import {useColorScheme} from "react-native";

const Stack = createNativeStackNavigator<StackParamList>();

export type StackParamList = {
    Detail: { originalTitle: string }
}
const Component = () => {
    const isDark = useColorScheme() === 'dark';
    return (<Stack.Navigator
        screenOptions={{
            presentation: "fullScreenModal",
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: isDark ? NAV_BACKGROUND_DARK : 'white',
            },
            headerTitleStyle: {
                color: isDark ? 'white' : NAV_BACKGROUND_DARK,
            },
            headerTintColor: isDark ? 'white' : NAV_BACKGROUND_DARK,
        }}>
        <Stack.Screen name="Detail" component={Detail}/>
    </Stack.Navigator>);
}

export default Component;
