import {Text, TouchableOpacity} from "react-native";

const Screen = ({navigation: {navigate}}) => (
    <TouchableOpacity
        onPress={() => navigate('Stack', {screen: 'two'})}
        style={{
            flex: 1, justifyContent: "center", alignItems: "center"
        }}>
        <Text>Movie</Text>
    </TouchableOpacity>
);

export default Screen;
