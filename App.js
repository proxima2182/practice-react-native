import styled from "styled-components/native";
import {useEffect, useState} from "react";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Box = styled.TouchableOpacity`
    background-color: tomato;
    width: 100px;
    height: 100px;
`;
export default function App() {
    const [y, setY] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const moveUp = () => {
        const id = setInterval(() => {
            setY(prev=>prev+20);
        }, 10);
        setIntervalId(id);
    }
    useEffect(() => {
        if(y === 200) {
            clearInterval(intervalId);
        }
    }, [y, intervalId]);
    return (
        <Container>
            <Box onPress={moveUp} style={{
                transform: [{
                    translateY: y,
                }]
            }}/>
        </Container>
    );
}
