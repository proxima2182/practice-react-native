import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from "react-native";
import * as SplashScreen from "expo-splash-screen/build/index.native";
import * as Font from 'expo-font';
import {Asset} from "expo-asset";
import {Ionicons} from "@expo/vector-icons"

SplashScreen.preventAutoHideAsync();
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

                /* first try */
                // await Font.loadAsync(Ionicons.font);
                // await Asset.loadAsync(require('./pixel-art-7284052_640.png'));
                // await Image.prefetch("https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png");

                /* second try */
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

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }
    return (
        <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onLayout={onLayoutRootView}>
            <Text>SplashScreen Demo! 👋</Text>
            <Ionicons name="analytics-sharp" size={24} color="black"/>
            {/*<Entypo name="rocket" size={30} />*/}
        </View>
    );
}

