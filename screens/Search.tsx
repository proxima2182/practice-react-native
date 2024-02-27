import React, {useState} from "react";
import styled from "styled-components/native";
import {useQuery} from "react-query";
import Api from "../Api";
import Loading from "../components/Loading";
import HorizontalList from "../components/HorizontalList";
import ListTitle from "../components/ListTitle";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

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

const Screen: React.FC<BottomTabScreenProps<any, "Search">> = () => {
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
                searchMovie.data ? <HorizontalList array={searchMovie.data?.results ?? []}/> : null
            }
            {
                searchTV.data ? <ListTitle>TV Results</ListTitle> : null
            }
            {
                searchTV.data ? <HorizontalList array={searchTV.data?.results ?? []}/> : null
            }
        </Container>
    );
}

export default Screen;
