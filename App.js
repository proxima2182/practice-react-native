import styled from "styled-components/native";
import {Animated, Pressable} from "react-native";
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
export default function App() {
    // 1. Animated.Value 를 사용한다
    // 2. 직접 Animated.Value 값을 설정하지 않는다
    // * decay(), spring(),timing()
    // 3. Animated.XXXX Component 를 사용한다
    // * 만약 지원하는 Image, ScrollView, Text, View, FlatList, SectionList 에 없다면 createAnimatedComponent() 사용

    // state 는 rerender 하기 때문에 animation 관련 상태값을 저장하기 위해서는 useRef 를 사용해야한다
    // useRef 를 사용하면 초기화된다고 해서 reset 되지 않음
    const Y_POSITION = useRef(new Animated.Value(200)).current;
    const [up, setUp] = useState(false);
    // 생성되어있는 Component 를 Animated 로 바꾸는 방법
    const AnimatedBox = Animated.createAnimatedComponent(Box);

    const toggleUp = () => {
        setUp(prev => !prev)
        Y_POSITION.addListener(({value}) => {
            // console.log(value)
        })
    }
    const moveUp = () => {
        Animated.timing(Y_POSITION, {
            toValue: up ? 200 : -200,
            useNativeDriver: true,
        }).start(toggleUp);
    }
    // 왜 addListener 없으면 작동이 정상으로안되지..?
    Y_POSITION.addListener(({value}) => {
        // console.log(value)
    })
    const opacityValue = Y_POSITION.interpolate({
        inputRange: [-200, 0, 200],
        outputRange: [1, 0, 1]
    })
    const borderRadius = Y_POSITION.interpolate({
        inputRange: [-200, 200],
        outputRange: [100, 0]
    })
    return (
        <Container>
            <Pressable onPress={moveUp}>
                <AnimatedBox style={{
                    opacity: opacityValue,
                    borderRadius: borderRadius,
                    transform: [{
                        translateY: Y_POSITION,
                    }]
                }}/>
            </Pressable>
        </Container>
    );
}
