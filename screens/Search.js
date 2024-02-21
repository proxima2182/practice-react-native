import styled from "styled-components/native";

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const StyledText = styled.Text`
    color: ${(props) => props.selected ? 'blue' : 'red'}
`;

const Screen = () => (
    <StyledView>
        <StyledText selected={true}>Search</StyledText>
    </StyledView>
);

export default Screen;
