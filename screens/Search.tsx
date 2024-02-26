import React, {useState} from "react";
import styled from "styled-components/native";
import {useQuery} from "react-query";
import Api from "../Api";
import Loading from "../components/Loading";
import HorizontalList from "../components/HorizontalList";
import {IHorizontalItemProps} from "../components/HorizontalItem";
import ListTitle from "../components/ListTitle";

const Container = styled.ScrollView`
`;

const SearchBar = styled.TextInput`
    background-color: white;
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 15px;
    width: 90%;
    margin: 10px auto;
`;

function mapToMovieItem(array: IMovieData[]) {
    return array.map(item => {
        return {
            id: item.id,
            image: item.poster_path,
            title: item.original_title,
            rate: item.vote_average,
        } as IHorizontalItemProps
    });
}

function mapToTVItem(array: ITVData[]) {
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
    const [query, setQuery] = useState("")
    const searchMovie = useQuery({
        ...Api.Search.movie(query),
        enabled: false,
    });
    const searchTV = useQuery({
        ...Api.Search.TV(query),
        enabled: false,
    });
    const onChangeText = (text: string) => setQuery(text);
    const onSubmit = () => {
        if (query === "") {
            return;
        }
        searchMovie.refetch()
        searchTV.refetch()
    }

    const isLoading = searchMovie.isLoading || searchTV.isLoading;
    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or TV Show"
                placeholderTextColor="gray"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}/>
            {isLoading ? <Loading/> : null}
            {
                searchMovie.data ? <ListTitle>Movie Results</ListTitle> : null
            }
            {
                searchMovie.data ? <HorizontalList array={mapToMovieItem(searchMovie.data?.results ?? [])}/> : null
            }
            {
                searchTV.data ? <ListTitle>TV Results</ListTitle> : null
            }
            {
                searchTV.data ? <HorizontalList array={mapToTVItem(searchTV.data?.results ?? [])}/> : null
            }
        </Container>
    );
}

export default Screen;
