import React, {useEffect, useState} from 'react';
import {Image} from "react-native";
import * as Font from 'expo-font';
import {Asset} from "expo-asset";
import {Ionicons} from "@expo/vector-icons"
import {NavigationContainer} from "@react-navigation/native";
import Navigation from "./navigation/Navigation";

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));
    const loadImages = (images) => images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.loadAsync(image);
        }
    })

    useEffect(() => {
        async function prepare() {
            try {
                const fonts = loadFonts([Ionicons.font]);
                const images = loadImages([
                    require('./pixel-art-7284052_640.png'),
                    "https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png"
                ]);
                await Promise.all([...fonts, ...images]);

            } catch (e) {
                console.warn(e)
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    if (!appIsReady) {
        return null;
    }
    return (
        <NavigationContainer>
            <Navigation/>
        </NavigationContainer>
    );
}

