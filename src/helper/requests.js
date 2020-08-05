import { API_KEY } from './helper';

const requests = {
    fetchTopRatedMovies: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,

    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRatedTV: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionTV: `/discover/tv?api_key=${API_KEY}&with_genres=28`,
    fetchComedyTV: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
    fetchRomanceTV: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
}

export default requests;
