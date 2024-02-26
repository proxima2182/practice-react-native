import {FlatList} from "react-native";
import HorizontalItem, {IHorizontalItemProps} from "./HorizontalItem";
import {extractKey} from "../utils";
import React from "react";
import styled from "styled-components/native";

const HorizontalSeparator = styled.View`
    width: 15px;
`;

const Component: React.FC<{ array: IHorizontalItemProps[] }> = ({array}) => {
    return (
        <FlatList
            data={array}
            renderItem={({item}) => <HorizontalItem props={item}/>}
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
