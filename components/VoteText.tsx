import React from "react";
import styled from "styled-components/native";
import {TextStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

const View = styled.Text`
    margin: 5px;
    color: ${(props) => props.theme.mainContentColor};
`;

interface VoteTextProps {
    vote_average: string;
    style?: TextStyle;
}

const Component: React.FC<VoteTextProps> = ({vote_average, style}) => {
    let voteAverage = Math.floor(parseFloat(vote_average) * 100) / 100;
    return (
        <View style={style}>
            {
                voteAverage > 0 ?
                    `★${voteAverage}/10` :
                    'Coming Soon'
            }
        </View>
    )
}

export default Component;
