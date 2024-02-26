import React from "react";
import {Dimensions, FlatList} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import SlideItem from "../components/SlideItem";
import HorizontalItem, {IHorizontalItemProps} from "../components/HorizontalItem";
import VerticalItem, {IVerticalItemProps} from "../components/VerticalItem";
import {useQueryClient} from "react-query";
import Api from "../Api";
import Loading from "../components/Loading";
import {extractKey} from "../utils";

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

const Screen: React.FC<NativeStackScreenProps<any, "Movie">> = ({navigation: {navigate}}) => {
    const queryClient = useQueryClient();
    const nowPlaying = Api.Movie.nowPlaying();
    const trending = Api.Movie.trending();
    const upcoming = Api.Movie.upcoming();

    const isLoading = nowPlaying.isLoading || trending.isLoading || upcoming.isLoading;
    const isRefreshing = nowPlaying.isRefetching || trending.isRefetching || upcoming.isRefetching

    return isLoading ?
        (<Loading/>) :
        (<FlatList
            refreshing={isRefreshing}
            onRefresh={() => {
                queryClient.refetchQueries(["movie"])
            }}
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
                                <SlideItem key={extractKey(item, index)} props={item}/>
                            ))
                        }
                    </Swiper>
                    <ListTitle>Trending Movies</ListTitle>
                    <FlatList
                        data={(trending.data?.results ?? [])}
                        renderItem={({item}) => <HorizontalItem props={{
                            id: item.id,
                            image: item.poster_path,
                            title: item.original_title,
                            rate: item.vote_average,
                        } as IHorizontalItemProps}/>}
                        keyExtractor={extractKey}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={HorizontalSeparator}
                        contentContainerStyle={{
                            paddingHorizontal: 20
                        }}
                    />
                    <ListTitle>Coming Soon</ListTitle>
                </>
            }
            data={upcoming.data?.results ?? []}
            renderItem={({item}) => {
                return <VerticalItem props={{
                    id: item.id,
                    image: item.poster_path,
                    title: item.original_title,
                    content: item.overview,
                    date: item.release_date,
                } as IVerticalItemProps}/>
            }}
            keyExtractor={extractKey}
            ItemSeparatorComponent={VerticalSeparator}
            style={{
                marginBottom: 20
            }}
        />);
};

export default Screen;
