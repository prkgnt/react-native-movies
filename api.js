const API_KEY = "f81d9dce412077eefa650beb307d468c";
const BASE_URL = "https://api.themoviedb.org/3";

export const moviesApi = {
  trending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json()),
  upcoming: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${pageParam}`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=1&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    //queryKey에서 두번째 요소를 query에 저장
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&page=1&region=KR&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    //queryKey에서 두번째 요소를 query에 저장
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=1`).then(
      (res) => res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=1`).then((res) =>
      res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=1`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    //queryKey에서 두번째 요소를 query에 저장
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&page=1&region=KR&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    //queryKey에서 두번째 요소를 query에 저장
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
