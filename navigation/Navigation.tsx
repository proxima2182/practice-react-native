import React from "react";
import {createNativeStackNavigator, NativeStackNavigationProp} from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack, {StackParamList} from "./Stack";
import {NavigatorScreenParams} from "@react-navigation/native";

export type RootParamList = {
    Tabs: undefined;
    Stack: NavigatorScreenParams<StackParamList>;
}

const RootNavigation = createNativeStackNavigator<RootParamList>();

export type RootNavigationProp = NativeStackNavigationProp<RootParamList, 'Stack'>

const Root = () => (<RootNavigation.Navigator
    screenOptions={{headerShown: false}}>
    <RootNavigation.Screen name="Tabs" component={Tabs}/>
    <RootNavigation.Screen name="Stack" component={Stack}/>
</RootNavigation.Navigator>);

export default Root;
