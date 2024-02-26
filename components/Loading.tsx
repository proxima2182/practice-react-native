import styled from "styled-components/native";
import {ActivityIndicator} from "react-native";
import React from "react";

const View = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Component = () => {
    return (<View>
        <ActivityIndicator size="large"/>
    </View>);
}
export default Component;
