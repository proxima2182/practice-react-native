import styled from "styled-components/native";
import {Animated, Dimensions, Pressable} from "react-native";
import {useRef, useState} from "react";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
// styled 를 이용해서 Animated Component 만드는 방법
// styled(Animated.createAnimatedComponent(TouchableOpacity))
const Box = styled.View`
    background-color: tomato;
    width: 100px;
    height: 100px;
`;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get("screen");

export default function App() {
    // 1. Animated.Value 를 사용한다
    // 2. 직접 Animated.Value 값을 설정하지 않는다
    // * decay(), spring(),timing()
    // 3. Animated.XXXX Component 를 사용한다
    // * 만약 지원하는 Image, ScrollView, Text, View, FlatList, SectionList 에 없다면 createAnimatedComponent() 사용

    // state 는 rerender 하기 때문에 animation 관련 상태값을 저장하기 위해서는 useRef 를 사용해야한다
    // useRef 를 사용하면 초기화된다고 해서 reset 되지 않음
    const POSITION = useRef(new Animated.ValueXY({x: 0, y: 200})).current;
    const [up, setUp] = useState(false);
    // 생성되어있는 Component 를 Animated 로 바꾸는 방법
    const AnimatedBox = Animated.createAnimatedComponent(Box);

    const toggleUp = () => {
        setUp(prev => !prev)
    }
    const moveUp = () => {
        Animated.timing(POSITION, {
            toValue: up ? 200 : -200,
            // toValue: up ? {
            //     x: 200,
            //     y: 200
            // } : {
            //     x: -200,
            //     y: -200
            // },
            useNativeDriver: false, // useNativeDriver: true 하니 addListener 없이 작동안함
        }).start(toggleUp);
    }
    const opacityValue = POSITION.y.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [1, 0, 1]
    });
    const borderRadius = POSITION.y.interpolate({
        inputRange: [-200, 200],
        outputRange: [100, 0]
    });
    const rotation = POSITION.y.interpolate({
        inputRange: [-200, 200],
        outputRange: ["-360deg", "360deg"]
    });
    const bgColor = POSITION.y.interpolate({
        inputRange: [-200, 200],
        outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"]
    })
    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox style={{
                    opacity: opacityValue,
                    borderRadius: borderRadius,
                    backgroundColor: bgColor,
                    transform: [
                        // {translateY: POSITION.y},
                        // {translateX: POSITION.x},
                        ...POSITION.getTranslateTransform(),
                        {rotateY: rotation}]
                }}/>
            </Pressable>
        </Container>
    );
}
