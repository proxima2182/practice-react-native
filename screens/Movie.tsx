import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

const Screen: React.FC<NativeStackScreenProps<any, "Movie">> = ({navigation: {navigate}}) => (
    <TouchableOpacity
        onPress={() => navigate('Stack', {screen: 'two'})}
        style={styles.button}>
        <Text>Movie</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {flex: 1, justifyContent: "center", alignItems: "center"}
})

export default Screen;
