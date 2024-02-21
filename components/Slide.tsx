import {makeImagePath} from "../utils";
import {BlurView} from "expo-blur";
import {StyleSheet, useColorScheme, View} from "react-native";
import React from "react";
import styled from "styled-components/native";

const BackgroundImage = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const PosterImage = styled.Image`
    width: 100px;
    height: 160px;
    border-radius: 5px;
`;
const Title = styled.Text<{ isDark: boolean }>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.isDark ? "white" : "black"};
`;
const Overview = styled.Text<{ isDark: boolean }>`
    margin-top: 5px;
    color: ${(props) => props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
/**
 * styled(...) 라고 했을 시에 전체 css 를 가져옴
 */
const Votes = styled(Overview)`
    margin-top: 10px;
`;
const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left: 15px;
`;

interface SlideProps {
    id: string;
    backdrop_path: string;
    poster_path: string;
    original_title: string;
    vote_average: string;
    overview: string;
}

const Component: React.FC<{props: SlideProps}> = ({props}) => {
    const isDark = useColorScheme() === 'dark';
    let voteAverage = Math.floor(parseFloat(props.vote_average) * 100) / 100;
    return (
        <View style={{flex: 1}} key={props.id}>
            <BackgroundImage source={{
                uri: makeImagePath(props.backdrop_path)
            }}/>
            <BlurView
                intensity={80}
                tint={isDark ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}>
                <Wrapper>
                    <PosterImage source={{uri: makeImagePath(props.poster_path)}}/>
                    <Column>
                        <Title isDark={isDark}>{props.original_title}</Title>
                        {
                            voteAverage > 0 ? (
                                <Votes isDark={isDark}>{`★${props.vote_average}/10`}</Votes>
                            ) : null
                        }
                        <Overview
                            isDark={isDark}>{`${props.overview.slice(0, 100)}${props.overview.length > 100 ? "..." : ""}`}</Overview>
                    </Column>
                </Wrapper>
            </BlurView>
        </View>
    )
};

export default Component;
