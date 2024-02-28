import styled from "styled-components/native";
import {Animated, PanResponder, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useRef, useState} from "react";
import icons from "./icons";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #00a8ff;
`;
const CardContainer = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
`;
// 이렇게 styled 를 가져오지 않으면 자동완성이 안됨
const Card = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    width: 250px;
    height: 250px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    elevation: 5;
`;
const ButtonContainer = styled.View`
    flex: 1;
    flex-direction: row;
    margin-top: 50px;
`;
const Button = styled.Pressable`
    width: 58px;
    height: 58px;
    margin: 0 10px;
`;

export default function App() {
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const rotation = position.interpolate({
        inputRange: [-250, 250],
        outputRange: ['-15deg', '15deg'],
        extrapolate: 'extend', //range 를 벗어났을 때의 동작 extend(계속), identity(이상해짐), clamp(멈춤)
    });
    const opacity = position.interpolate({
        inputRange: [-280, -200, 200, 280],
        outputRange: [0, 1, 1, 0],
    });
    const scaleSecond = position.interpolate({
        inputRange: [-250, 0, 250],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp',
    })

    position.addListener((value) => {
        console.log(value)
    });

    const animationScaleIn = Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: false
    })
    const animationScaleOut = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false
    });
    const animationGoCenter = Animated.spring(position, {
        toValue: 0,
        bounciness: 10,
        useNativeDriver: false
    });
    const animationGoLeft = Animated.spring(position, {
        toValue: -280,
        tension: 50,
        restSpeedThreshold: 100, //애니메이션이 정지되었다고 취급하는 움직임 범위 수치
        restDisplacementThreshold: 100,
        useNativeDriver: false,
    });
    const animationGoRight = Animated.spring(position, {
        toValue: 280,
        tension: 50,
        useNativeDriver: false,
    });

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx}) => {
            position.setValue(dx);
        },
        onPanResponderGrant: () => {
            animationScaleIn.start()
        },
        onPanResponderRelease: (_, {dx}) => {
            if (dx < -230) {
                animationGoLeft.start(onDismiss);
            } else if (dx > 230) {
                animationGoRight.start(onDismiss);
            } else {
                Animated.parallel([
                    animationScaleOut,
                    animationGoCenter
                ]).start();
            }
        }
    })).current;

    const [index, setIndex] = useState(0);

    const onDismiss = () => {
        scale.setValue(1)
        position.setValue(0)
        setIndex(prev => icons.length <= prev + 1 ? 0 : prev + 1);
    }

    const onPressedClose = () => {
        animationGoLeft.start(onDismiss);
    }
    const onPressedCheck = () => {
        animationGoRight.start(onDismiss);
    }

    return (
        <Container>
            <CardContainer>
                <Card
                    style={{
                        transform: [{
                            scale: scaleSecond,
                        }]
                    }}
                    {...panResponder.panHandlers}>
                    <Ionicons name={icons[((index + 1) % icons.length)]} color="#192a56" size={100}/>
                </Card>
                <Card
                    style={{
                        opacity: opacity,
                        transform: [{
                            scale: scale
                        }, {
                            translateX: position
                        }, {
                            rotateZ: rotation
                        }]
                    }}
                    {...panResponder.panHandlers}>
                    <Ionicons name={icons[index]} color="#192a56" size={100}/>
                </Card>
            </CardContainer>
            <ButtonContainer>
                <Button onPress={onPressedClose}>
                    <Ionicons name="close-circle" color="white" size={58}/>
                </Button>
                <Button onPress={onPressedCheck}>
                    <Ionicons name="checkmark-circle" color="white" size={58}/>
                </Button>
            </ButtonContainer>
        </Container>
    );
}

// selective stylesheet
// const styles = StyleSheet.create({
//     container: {
//         ...Platform.select({
//             ios: {
//                 shadowColor: "rgb(0,0,0)",
//                 shadowOpacity: 0.3,
//                 shadowRadius: 5,
//                 shadowOffset: {
//                     height: -1,
//                     width: 0
//                 }
//             },
//             android: {
//                 elevation: 5
//             }
//         })
//     }
// })
