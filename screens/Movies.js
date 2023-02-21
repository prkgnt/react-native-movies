import React, { useState } from "react";
import { Alert, Dimensions, FlatList, View } from "react-native";
import Swiper from "react-native-swiper";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Loader from "../components/loader";
import Slide from "../components/slide";
import VMedia from "../components/VMedia";

const ListContainer = styled.View``;

const TrendingScroll = styled.FlatList``;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const ComingSoonText = styled(ListTitle)`
  margin-bottom: 10px;
`;

const HMovie = styled.View``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// == const SCREEN_HEIGHT = Dimensions.get("window").height;

const Movies = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(["movies", "nowPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["movies", "upcoming"], moviesApi.upcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(["movies", "trending"], moviesApi.trending);
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };
  const renderVMedia = ({ item }) => (
    <VMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      release_date={item.release_date}
      overview={item.overview}
      fullData={item}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      poster_path={item.poster_path}
      original_title={item.original_title}
      vote_average={item.vote_average}
      fullData={item}
    />
  );

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      refreshing={refreshing}
      //하나의 플랫리스트 위에 여러 컴포넌트를 올려놓을 수 있음
      ListHeaderComponent={
        // <> </> -> 한번에 여러 컴포넌트를 렌더링함
        <>
          <Swiper
            showsPagination={false}
            loop
            autoplay={true}
            autoplayTimeout={3.5}
            showsButtons={false}
            containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path}
                poster_path={movie.poster_path}
                original_title={movie.original_title}
                overview={movie.overview}
                vote_average={movie.vote_average}
                fullData={movie}
              />
            ))}
          </Swiper>

          <ListContainer>
            <ListTitle>Trending Movie</ListTitle>
            <TrendingScroll
              horizontal
              contentContainerStyle={{ paddingLeft: 30, paddingRight: 30 }}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              //이걸로 item을 받아와서 item.id를 키로 할당함
              //string 형이여야 하므로 item.id + "" 으로 인트형 -> 스트링형으로 변환
              keyExtractor={(item) => item.id + ""}
              data={trendingData.results}
              renderItem={renderHMedia}
            />
          </ListContainer>
          <ComingSoonText>Coming Soon</ComingSoonText>
        </>
      }
      contentContainerStyle={{ paddingBottom: 30 }}
      ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
      keyExtractor={(item) => item.id + ""}
      //flat()을 쓰면 배열 안에 배열을 그냥 배열로 바꿔줌
      //[[movie], [movie], [movie], [movie], [movie]].flat()
      //== [movie, movie, movie, movie, movie, movie]
      data={upcomingData.pages.map((page) => page.results).flat()}
      renderItem={renderVMedia}
    />
  );
};

export default Movies;
