import React from "react";
import {ScrollView} from "react-native";
import Api from "../Api";
import Loading from "../components/Loading";
import HorizontalList from "../components/HorizontalList";
import ListTitle from "../components/ListTitle";
import {IHorizontalItemProps} from "../components/HorizontalItem";

function mapToItem(array: ITVData[]) {
    return array.map(item => {
        return {
            id: item.id,
            image: item.poster_path,
            title: item.original_name,
            rate: item.vote_average,
        } as IHorizontalItemProps
    });
}

const Screen = () => {
    const airingToday = Api.TV.airingToday();
    const trending = Api.TV.trending();
    const topRated = Api.TV.topRated();

    const isLoading = airingToday.isLoading || trending.isLoading || topRated.isLoading;
    return isLoading ?
        (<Loading/>) :
        (<ScrollView>
            <ListTitle>Airing Today</ListTitle>
            <HorizontalList array={mapToItem(airingToday.data?.results ?? [])}/>
            <ListTitle>Trending</ListTitle>
            <HorizontalList array={mapToItem(trending.data?.results ?? [])}/>
            <ListTitle>Top Rated</ListTitle>
            <HorizontalList array={mapToItem(topRated.data?.results ?? [])}/>
        </ScrollView>)
};

export default Screen;
