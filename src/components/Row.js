import React, { useState, useEffect } from 'react';
import axios_helper from '../helper/axios_helper';
import '../css/Row.css';
import { Link } from 'react-router-dom';
import { baseImageUrl } from '../helper/helper';

function Row({ title, url, isLargeRow, mediaType }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios_helper.get(url);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [url]);

    return (
        <div className="row">
            {movies.length > 0 && <h2>{title}</h2>}
            <div className="movie_section">
                    {movies.map(movie => {
                        return (
                            <div className="movie_card" key={movie.id}>
                                <Link to={`/${mediaType}/${movie.id}`} className="movie_link">
                                    <img className={`movie_poster`}
                                        src={`${baseImageUrl}${movie.backdrop_path}`}
                                        alt={movie.name} />
                                </Link>
                            </div>
                        )
                    })}
            </div>

        </div>
    );
}

export default Row;
