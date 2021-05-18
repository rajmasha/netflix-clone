import React, { useState, useEffect } from 'react'
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';
import requests from '../helper/requests';
import axios_helper from '../helper/axios_helper';

function TVHome() {

    const [tvShow, setTVShow] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios_helper.get(requests.fetchNetflixOriginals);
            const random = Math.floor(Math.random() * request.data.results.length - 1);
            setTVShow(request.data.results[random]);
            return request;
        }
        window.scrollTo({ top: 0 });
        fetchData();
    }, []);

    return (
        <div className="app">
            <Nav />
            <Banner movie={tvShow} isDetailed mediaType={"tv"} />
            <Row title="NETFLIX ORIGINALS" url={requests.fetchNetflixOriginals} isLargeRow={true} mediaType={"tv"} />
            <Row title="Top Rated" url={requests.fetchTopRatedTV} mediaType={"tv"} />
            <Row title="Action" url={requests.fetchActionTV} mediaType={"tv"} />
            <Row title="Comedy" url={requests.fetchComedyTV} mediaType={"tv"} />
            <Row title="Drama" url={requests.fetchDramaTV} mediaType={"tv"} />
        </div>
    )
}

export default TVHome
