import React, {useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import Api from "../Api";
import Loading from "../components/Loading";
import HorizontalList from "../components/HorizontalList";
import ListTitle from "../components/ListTitle";
import {useQuery, useQueryClient} from "react-query";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

const Screen: React.FC<BottomTabScreenProps<any, "TV">> = () => {
    const queryClient = useQueryClient();
    const [isRefreshing, setRefreshing] = useState(false);
    const airingToday = useQuery(Api.TV.airingToday());
    const trending = useQuery(Api.TV.trending());
    const topRated = useQuery(Api.TV.topRated());

    const isLoading = airingToday.isLoading || trending.isLoading || topRated.isLoading;
    const onRefresh = async () => {
        setRefreshing(true)
        queryClient.refetchQueries(['tv'])
        setRefreshing(false)
    }

    return isLoading ?
        (<Loading/>) :
        (<ScrollView
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh}/>}>
            <ListTitle>Airing Today</ListTitle>
            <HorizontalList array={airingToday.data?.results ?? []}/>
            <ListTitle>Trending</ListTitle>
            <HorizontalList array={trending.data?.results ?? []}/>
            <ListTitle>Top Rated</ListTitle>
            <HorizontalList array={topRated.data?.results ?? []}/>
        </ScrollView>)
};

export default Screen;
