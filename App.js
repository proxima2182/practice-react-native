import styled from "styled-components/native";
import {Animated, Dimensions, PanResponder, View} from "react-native";
import {useRef} from "react";

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
    const POSITION = useRef(new Animated.ValueXY({
        x: 0,
        y: 0
    })).current;

    // 생성되어있는 Component 를 Animated 로 바꾸는 방법
    const AnimatedBox = Animated.createAnimatedComponent(Box);

    const borderRadius = POSITION.y.interpolate({
        inputRange: [-200, 200],
        outputRange: [100, 0]
    });
    const bgColor = POSITION.y.interpolate({
        inputRange: [-200, 200],
        outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"]
    })
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        // onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            console.log("Touch Started")
            // 함수 시작할 때 호출됨
            POSITION.setOffset({
                x: POSITION.x.__getValue(),
                y: POSITION.y.__getValue(),
            })
        },
        onPanResponderMove: (_, {dx, dy}) => {
            // dx, dy 는 터치 시작으로부터 이동한 양이기 때문에 Release 후에는 다시 0부터 시작함
            POSITION.setValue({
                x: dx,
                y: dy
            });
        },
        onPanResponderRelease: () => {
            console.log("Touch Finished")
            POSITION.flattenOffset();
        },

    })).current;
    return (
        <Container>
            <AnimatedBox
                style={{
                    borderRadius: borderRadius,
                    backgroundColor: bgColor,
                    transform: POSITION.getTranslateTransform()
                }}
                {...panResponder.panHandlers}>
            </AnimatedBox>
        </Container>
    );
}
