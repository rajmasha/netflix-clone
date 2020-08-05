import React, {useState, useEffect} from 'react'
import Nav from './Nav';
import Banner from './Banner';
import Row from './Row';
import requests from '../helper/requests';
import axios_helper from '../helper/axios_helper';

function Home() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios_helper.get(requests.fetchActionMovies);
            const random = Math.floor(Math.random() * request.data.results.length - 1);
            setMovie(request.data.results[random]);
            return request;
        }
        window.scrollTo({top: 0});
        fetchData();
    }, []);

    return (
        <div className="app">
            <Nav />
            <Banner movie={movie} mediaType={"movie"}/>
            <Row title="NETFLIX ORIGINALS" url={requests.fetchNetflixOriginals} isLargeRow={true} mediaType={"tv"} />
            <Row title="Top Rated" url={requests.fetchTopRatedMovies} mediaType={"movie"}/>
            <Row title="Action" url={requests.fetchActionTV} mediaType={"tv"} />
            <Row title="Comedy" url={requests.fetchComedyTV} mediaType={"tv"} />
            <Row title="Romance" url={requests.fetchRomanceMovies} mediaType={"movie"} />
        </div>
    )
}

export default Home
