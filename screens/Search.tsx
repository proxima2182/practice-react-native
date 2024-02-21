import React from "react";
import styled from "styled-components/native";

const StyledView = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;

// attr override
// https://styled-components.com/docs/basics#attaching-additional-props

const StyledText = styled.Text.attrs<{ selected: boolean }>((props) => ({
    selected: props.selected
}))`
    color: ${(props) => props.theme.mainTextColor};
`;

const Screen = () => (
    <StyledView>
        <StyledText selected={true}>Search</StyledText>
    </StyledView>
);

export default Screen;
