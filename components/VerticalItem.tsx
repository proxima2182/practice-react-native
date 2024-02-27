import React from "react";
import Poster from "./Poster";
import styled from "styled-components/native";
import {limitTextSize} from "../utils";
import {useNavigation} from "@react-navigation/native";
import {TouchableOpacity} from "react-native";
import {RootNavigationProp} from "../navigation/Navigation";

const Title = styled.Text`
    font-weight: 600;
    font-size: 16px;
    color: ${(props) => props.theme.mainTextColor};
`;
const View = styled.View`
    flex-direction: row;
    margin: 0 20px;
`;
const Column = styled.View`
    width: 80%;
    margin-left: 15px;
`;
const Overview = styled.Text`
    width: 80%;
    color: ${(props) => props.theme.mainTextColor};
`;
const DateText = styled.Text`
    margin-top: 10px;
    font-size: 12px;
    color: ${(props) => props.theme.mainTextColor};
`;

interface IVerticalItemData extends IRootItem {
    image: string;
    title: string;
    content: string;
    date: string;
}

const itemToData = (item: IMovieData) => {
    return {
        id: item.id,
        image: item.poster_path,
        title: item.original_title,
        content: item.overview,
        date: item.release_date,
    } as IVerticalItemData
}

const Component: React.FC<{ item: IMovieData }> = ({item}) => {
    const navigation = useNavigation<RootNavigationProp>();
    const data = itemToData(item)

    const goToDetail = () => {
        navigation.navigate("Stack", {
            screen: 'Detail',
            params: item
        });
    }
    return (
        <TouchableOpacity onPress={goToDetail}>
            <View key={data.id}>
                <Poster path={data.image}/>
                <Column>
                    <Title>{limitTextSize(data.title, 30)}</Title>
                    <Overview>{limitTextSize(data.content, 150)}</Overview>
                    <DateText>
                        {new Date(data.date).toLocaleDateString('ko')}
                    </DateText>
                </Column>
            </View>
        </TouchableOpacity>
    );
}
export default Component;
