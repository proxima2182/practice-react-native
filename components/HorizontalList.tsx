import {FlatList} from "react-native";
import HorizontalItem, {IHorizontalItem} from "./HorizontalItem";
import {extractKey} from "../utils";
import React from "react";
import styled from "styled-components/native";

const HorizontalSeparator = styled.View`
    width: 15px;
`;

const Component: React.FC<{ array: (IHorizontalItem)[] }> = ({array}) => {
    return (
        <FlatList
            data={array}
            renderItem={({item}) => <HorizontalItem item={item}/>}
            keyExtractor={extractKey}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={HorizontalSeparator}
            contentContainerStyle={{
                paddingHorizontal: 20
            }}/>
    )
}
export default Component;
