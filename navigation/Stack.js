import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text, TouchableOpacity} from "react-native";

const GenerateScreen = (key) => {
    let nextKey;
    switch (key) {
        case 'one' :
            nextKey = 'two';
            break;
        case 'two' :
            nextKey = 'three';
            break;
    }
    return ({navigation: {navigate}}) => (
        <TouchableOpacity
            onPress={nextKey ? () => navigate(nextKey) : undefined}>
            <Text>{key}</Text>
        </TouchableOpacity>
    );
}

const SceneTwo = ({navigation: {setOptions}}) => {
    return (
        <TouchableOpacity
            onPress={() => setOptions({title: 'hello!'})}>
            <Text>Change Title</Text>
        </TouchableOpacity>
    )
}

const NativeStack = createNativeStackNavigator();

const Stack = () => <NativeStack.Navigator>
    <NativeStack.Screen name="one" component={GenerateScreen("one")}/>
    <NativeStack.Screen name="two" component={SceneTwo}/>
    <NativeStack.Screen name="three" component={GenerateScreen("three")}/>
</NativeStack.Navigator>;

export default Stack;
