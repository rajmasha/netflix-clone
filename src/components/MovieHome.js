import React, { useState, useEffect } from 'react'
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';
import requests from '../helper/requests';
import axios_helper from '../helper/axios_helper';

function MovieHome() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios_helper.get(requests.fetchTopRatedMovies);
            const random = Math.floor(Math.random() * request.data.results.length - 1);
            setMovie(request.data.results[random]);
            return request;
        }
        window.scrollTo({ top: 0 });
        fetchData();
    }, []);

    return (
        <div className="app">
            <Nav />
            <Banner movie={movie} isDetailed mediaType={"movie"} />
            <Row title="Top Rated" url={requests.fetchTopRatedMovies} mediaType={"movie"} />
            <Row title="Action" url={requests.fetchActionMovies} mediaType={"movie"} />
            <Row title="Comedy" url={requests.fetchComedyMovies} mediaType={"movie"} />
            <Row title="Romance" url={requests.fetchRomanceMovies} mediaType={"movie"} />
        </div>
    )
}

export default MovieHome;
