import React, {useEffect} from "react";
import styled from "styled-components/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {StackParamList} from "../navigation/Stack";

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Component: React.FC<NativeStackScreenProps<StackParamList, 'Detail'>> = (
    {
        navigation: {setOptions},
        route: {params: {originalTitle}}
    }) => {
    useEffect(() => {
        setOptions({
            title: originalTitle
        })
    }, []);
    return (<Container></Container>);
};

export default Component;
