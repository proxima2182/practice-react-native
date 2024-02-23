import React from "react";
import {ActivityIndicator, Dimensions, FlatList} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import SlideItem from "../components/SlideItem";
import HorizontalItem from "../components/HorizontalItem";
import VerticalItem from "../components/VerticalItem";
import {useQueryClient} from "react-query";
import Api from "../Api";

const Container = styled.ScrollView`
`;
const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const View = styled.View`
    flex: 1;
`;
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
    const nowPlaying = Api.movie.nowPlaying();
    const trending = Api.movie.trending();
    const upcoming = Api.movie.upcoming();

    const isLoading = nowPlaying.isLoading || trending.isLoading || upcoming.isLoading;
    const isRefreshing = nowPlaying.isRefetching || trending.isRefetching || upcoming.isRefetching

    const extractKey = (item: IMovie, index: number) => item.id ?? 'I' + index;

    return isLoading ?
        (<Loading>
            <ActivityIndicator size="large"/>
        </Loading>) :
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
                        renderItem={({item}) => <HorizontalItem props={item}/>}
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
            renderItem={({item}) => <VerticalItem props={item}/>}
            keyExtractor={extractKey}
            ItemSeparatorComponent={VerticalSeparator}
            style={{
                marginBottom: 20
            }}
        />);
};

export default Screen;
