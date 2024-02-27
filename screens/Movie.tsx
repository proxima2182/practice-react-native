import React, {useState} from "react";
import {Dimensions, FlatList} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import SlideItem from "../components/SlideItem";
import VerticalItem from "../components/VerticalItem";
import {useQuery, useQueryClient} from "react-query";
import Api from "../Api";
import Loading from "../components/Loading";
import {extractKey} from "../utils";
import HorizontalList from "../components/HorizontalList";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

const ListTitle = styled.Text`
    color: ${(props) => props.theme.mainTextColor};
    font-size: 18px;
    font-weight: 600;
    margin: 15px 30px;
`;
const HorizontalSeparator = styled.View`
    width: 15px;
`;
const VerticalSeparator = styled.View`
    height: 20px;
`;

/**
 * const SCREEN_HEIGHT = Dimensions.get("window").height;
 * 를 아래와 같이 쓸 수 있다
 */
const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Screen: React.FC<BottomTabScreenProps<any, "Movie">> = () => {
    const queryClient = useQueryClient();
    const [isRefreshing, setRefreshing] = useState(false);
    const nowPlaying = useQuery(Api.Movie.nowPlaying());
    const trending = useQuery(Api.Movie.trending());
    const upcoming = useQuery(Api.Movie.upcoming());

    const isLoading = nowPlaying.isLoading || trending.isLoading || upcoming.isLoading;
    // 기존 const isRefreshing = nowPlaying.isRefetching || trending.isRefetching || upcoming.isRefetching 형태로 사용하면
    // refresh 가 개별적으로 이뤄지기 때문에 끊기는 현상이 생겨서 async를 한 작업으로 묶어줌
    const onRefresh = async () => {
        setRefreshing(true)
        queryClient.refetchQueries(['movie'])
        setRefreshing(false)
    }

    return isLoading ?
        (<Loading/>) :
        (<FlatList
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        containerStyle={{
                            width: "100%",
                            height: SCREEN_HEIGHT / 4,
                        }}>
                        {
                            (nowPlaying.data?.results ?? []).map((item, index) => (
                                <SlideItem key={extractKey(item, index)} item={item}/>
                            ))
                        }
                    </Swiper>
                    <ListTitle>Trending Movies</ListTitle>
                    <HorizontalList array={trending.data?.results ?? []}/>
                    <ListTitle>Coming Soon</ListTitle>
                </>
            }
            data={upcoming.data?.results ?? []}
            renderItem={({item}) => {
                return <VerticalItem item={item}/>
            }}
            keyExtractor={extractKey}
            ItemSeparatorComponent={VerticalSeparator}
            style={{
                marginBottom: 20
            }}
        />);
};

export default Screen;
