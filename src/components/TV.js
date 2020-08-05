import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Banner from './Banner';
import Nav from './Nav';
import Row from './Row';
import CastsRow from './CastsRow';
import { API_KEY } from '../helper/helper';

function TV() {

    const { id } = useParams();

    const [tv, setTVShow] = useState();
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
            const requestCasts = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`);
            // console.log(request.data);
            let validCasts = requestCasts.data.cast;
            validCasts = validCasts.filter((cast) => {
                return cast.profile_path;
            });
            setTVShow(request.data);
            setCasts(validCasts.slice(0, 5));
            return request;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchData();
    }, [id]);


    return (
        <div className="movie">
            <Nav />
            <Banner movie={tv} isDetailed mediaType={"tv"}/>
            <Row title="MORE LIKE THIS" url={`https://api.themoviedb.org/3/tv/${tv?.id}/similar?api_key=${API_KEY}`} mediaType={"tv"} />
            <CastsRow casts={casts} />
        </div>
    )
}

export default TV;
