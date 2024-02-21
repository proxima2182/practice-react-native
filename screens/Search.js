import styled from "styled-components/native";

const StyledView = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.mainBgColor};
`;
const StyledText = styled.Text`
    color: ${(props) => props.theme.mainTextColor};
`;

const Screen = () => (
    <StyledView>
        <StyledText selected={true}>Search</StyledText>
    </StyledView>
);

export default Screen;
