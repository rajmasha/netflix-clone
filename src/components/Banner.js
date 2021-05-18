import React, {useState, useEffect} from 'react';
import "../css/Banner.css";
import movieTrailer from 'movie-trailer';
import Modal from './Modal';
import { baseImageUrl } from '../helper/helper';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-toastify";

function Banner ({ movie, mediaType }) {

    const [trailerUrl, setTrailerUrl] = useState("");
    const [inList, setInList] = useState(false);

    useEffect (() => {
        console.log("Movie changed");
        setTrailerUrl("");

        let netflixMovies = [];
        if (localStorage.getItem("netflix-movies"))
            netflixMovies = JSON.parse(localStorage.getItem("netflix-movies"));

        for (let i=0; i<netflixMovies.length; i++) {
            if (movie && netflixMovies[i].id === movie.id) {
                setInList(true);
                break;
            }
        }

        return () => {
            setTrailerUrl("");
            setInList(false);
        }

    }, [movie]);


    const handleClick = (movie) => {
        console.log(movie.title);
        movieTrailer(movie.title)
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            })
            .catch((err) => console.log(err));
    }

    const addToList = (movie) => {
        let netflixMovies = JSON.parse(localStorage.getItem("netflix-movies"));
        if (!netflixMovies) netflixMovies = [];
        netflixMovies.push({id: movie.id, mediaType: mediaType});
        localStorage.setItem("netflix-movies", JSON.stringify(netflixMovies));
        console.log("Clicked Add to list");

        toast("Added to My List", {
            position: toast.POSITION.TOP_CENTER,
            className: "toast",
            bodyClassName: "toast_body"
        });

        setInList(true);
    }

    const hideVideo = () => {
        setTrailerUrl("");
    }

    return (

        <React.Fragment>

        <div className="banner">
            <div className="banner_content">
                <h1 className="title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <span className="text-small text-bold text-primary"> {`${movie?.vote_average}/10`} </span>
                <span className="text-small text-bold"> &nbsp; {movie?.release_date?.substring(0, 4)} </span><br/>
                <p className="description text-muted">
                    {movie?.overview?.trim()}
                </p>

                <div>
                    <p>
                            {mediaType === "movie" && <button className="netflix-btn play-btn" onClick={() => handleClick(movie)}><span className="fa fa-play"></span>PLAY</button>}
                            { inList === true ? "In List" : <button className="netflix-btn my-list-btn text-bold text-small" onClick={() => addToList(movie)}><span className="fa fa-plus"></span>MY LIST</button>}
                    </p>
                    {movie?.genres && <span className="text-small text-muted text-bold">Genres: </span>}
                    {movie?.genres?.map(genre => {
                        return (<span key={genre.id} className="text-small text-muted comma">{genre.name}</span>)
                    })}
                </div>

            </div>
            <div className="banner_image"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(${baseImageUrl}${movie?.backdrop_path})`,
                    backgroundPosition: "center top"
                }}>

            </div>
        </div>

            { trailerUrl && <Modal trailerUrl={trailerUrl} hideVideo={() => hideVideo()}/>}

            <ToastContainer
                autoClose={1500}
                transition={Zoom}
                draggable={false}
                hideProgressBar={true}
            />

        </React.Fragment>
    );
}

export default Banner;
