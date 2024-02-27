import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import RateText from "./RateText";
import {limitTextSize} from "../utils";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {RootNavigationProp} from "../navigation/Navigation";

const TrendingView = styled.View`
    align-items: center;
`;
const Title = styled.Text`
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    color: ${(props) => props.theme.mainTextColor};
`;

export interface IHorizontalItemData extends IRootItem {
    image: string;
    title: string;
    rate: number;
}

export type IHorizontalItem = IMovieData | ITVData;

function itemToData(item: IHorizontalItem) {
    return {
        id: item.id,
        image: item.poster_path,
        title: "original_title" in item ? item.original_title : item.original_name,
        rate: item.vote_average,
    } as IHorizontalItemData;
}

const Component: React.FC<{ item: IHorizontalItem }> = ({item}) => {
    const navigation = useNavigation<RootNavigationProp>();
    const data = itemToData(item);
    const goToDetail = () => {
        navigation.navigate('Stack', {
            screen: 'Detail',
            params: item
        });
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <TrendingView>
                <Poster path={data.image}/>
                <RateText vote_average={data.rate} style={{width: '100%', fontSize: 12}}/>
                <Title>{limitTextSize(data.title, 30)}</Title>
            </TrendingView>
        </TouchableOpacity>
    );
}
export default React.memo(Component);
