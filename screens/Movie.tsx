import React, {useState} from "react";
import {Dimensions, FlatList} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import SlideItem from "../components/SlideItem";
import VerticalItem from "../components/VerticalItem";
import {useInfiniteQuery, useQuery, useQueryClient} from "react-query";
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
    const upcoming = useInfiniteQuery({
        ...Api.Movie.upcoming(),
        getNextPageParam: (currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        }
    });

    const isLoading = nowPlaying.isLoading || trending.isLoading || upcoming.isLoading;
    // 기존 const isRefreshing = nowPlaying.isRefetching || trending.isRefetching || upcoming.isRefetching 형태로 사용하면
    // refresh 가 개별적으로 이뤄지기 때문에 끊기는 현상이 생겨서 async를 한 작업으로 묶어줌
    const onRefresh = async () => {
        setRefreshing(true)
        queryClient.refetchQueries(['movie'])
        setRefreshing(false)
    }
    const loadMore = () => {
        if(upcoming.hasNextPage) {
            upcoming.fetchNextPage();
        }
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
            onEndReached={loadMore}
            // onEndReachedThreshold={0.4} // 스크롤이 몇% 왔을 때 onEndReached 를 호출할건 지 지정
            // flat 은 es2019 에서 쓰일 수 있고 안의 subArray 를 풀어줌
            data={upcoming.data?.pages.map(page => page.results).flat()}
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
