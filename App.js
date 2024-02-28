import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {Animated, Easing, PanResponder, View} from "react-native";
import {useRef, useState} from "react";
import icons from "./icons";

const BLACK_COLOR = "#1e272e";
const GREY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
    flex: 1;
    background-color: ${BLACK_COLOR};
`;
const Edge = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const WordContainer = styled(Animated.createAnimatedComponent(View))`
    width: 120px;
    height: 120px;
    padding: 10px;
    border-radius: 60px;
    justify-content: center;
    align-items: center;
    background-color: ${GREY};
`;
const Word = styled.Text`
    font-size: 30px;
    color: ${(props) => props.color};
    font-weight: 500;
`;

const Center = styled.View`
    flex: 3;
    justify-content: center;
    align-items: center;
`;
const IconCard = styled(Animated.createAnimatedComponent(View))`
    background-color: white;
    padding: 40px;
    border-radius: 5px;
    z-index: 10;
`;

export default function App() {
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const scaleUp = position.y.interpolate({
        inputRange: [-300, -80],
        outputRange: [2, 1],
        extrapolate: "clamp",
    });
    const scaleDown = position.y.interpolate({
        inputRange: [80, 300],
        outputRange: [1, 2],
        extrapolate: "clamp",
    });

    position.addListener(value => {
        console.log(value)
    })

    const animationPressedIn = Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: false
    });
    const animationPressedOut = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false
    });
    const animationGoCenter = Animated.spring(position, {
        toValue: {
            x: 0,
            y: 0
        },
        useNativeDriver: false
    });
    const animationScaleDown = Animated.timing(scale, {
        toValue: 0.5,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
    });
    const animationFadeOut = Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
    });
    const animationGoCenterQuick = Animated.timing(position, {
        toValue: {
            x: 0,
            y: 0
        },
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false
    });
    const animationScaleUp = Animated.spring(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
    });
    const animationFadeIn = Animated.spring(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false
    });

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx, dy}) => {
            position.setValue({
                x: dx,
                y: dy
            });
        },
        onPanResponderGrant: () => {
            animationPressedIn.start();
        },
        onPanResponderRelease: (_, {dy}) => {
            if (dy < -250 || dy > 250) {
                Animated.sequence([
                    Animated.parallel([animationScaleDown, animationFadeOut]),
                    animationGoCenterQuick,
                ]).start(next);
            } else {
                // Animated.sequence 는 차례로 진행
                Animated.parallel([animationGoCenter, animationPressedOut]).start();
            }
        },
    })).current

    const [index, setIndex] = useState(0);
    const next = () => {
        setIndex(prev => icons.length <= prev + 1 ? 0 : prev + 1)
        Animated.parallel([animationScaleUp, animationFadeIn]).start();
    }

    return (
        <Container>
            <Edge>
                <WordContainer
                    style={{
                        transform: [{scale: scaleUp}]
                    }}>
                    <Word color={GREEN}>I Know.</Word>
                </WordContainer>
            </Edge>
            <Center>
                <IconCard
                    style={{
                        opacity: opacity,
                        transform: [
                            {scale: scale},
                            ...position.getTranslateTransform(),
                        ]
                    }}
                    {...panResponder.panHandlers}>
                    <Ionicons name={icons[index]} color={GREY} size={50}/>
                </IconCard>
            </Center>
            <Edge>
                <WordContainer
                    style={{
                        transform: [{scale: scaleDown}]
                    }}>
                    <Word color={RED}>Don't Know.</Word>
                </WordContainer>
            </Edge>
        </Container>
    );
}
