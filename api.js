const API_KEY = "f81d9dce412077eefa650beb307d468c";
const BASE_URL = "https://api.themoviedb.org/3";

const trending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=1`).then(
    (res) => res.json()
  );
const upcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=1`).then((res) =>
    res.json()
  );
const nowPlaying = () =>
  fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=1&region=KR`
  ).then((res) => res.json());

export const moviesApi = { trending, upcoming, nowPlaying };
