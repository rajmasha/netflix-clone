import React, { Component} from 'react';
import '../css/MyList.css';
import axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { API_KEY, baseImageUrl } from '../helper/helper';

class MyList extends Component {

    constructor () {
        super();
        this.state = {
            shows: [],
        }

        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(showList) {
        const list = [];
        let request;
        for (let i = 0; i < showList.length; i++) {
            if (showList[i].mediaType === "movie") {
                request = await axios.get(`https://api.themoviedb.org/3/movie/${showList[i].id}?api_key=${API_KEY}`);
                list.push({ data: request.data, mediaType: "movie" });
            }
            else {
                request = await axios.get(`https://api.themoviedb.org/3/tv/${showList[i].id}?api_key=${API_KEY}`);
                list.push({ data: request.data, mediaType: "tv" });
            }
        }

        this.setState({
            shows: list
        });
    }

    componentDidMount () {
        window.scrollTo({ top: 0 });
        const showList = JSON.parse(localStorage.getItem("netflix-movies"));
        this.fetchData(showList);
    }


    removeShow = (id) => {

        let list = JSON.parse(localStorage.getItem("netflix-movies"));
        list = list.filter((item) => {
            return item.id !== id;
        })
        localStorage.setItem("netflix-movies", JSON.stringify(list));

        list = this.state.shows;
        list = list.filter((show) => {
            return show.data.id !== id;
        })

        this.setState({
            shows: list
        });
    }

    render() {return (
        <React.Fragment>
        <Nav alwaysVisible />
        <div className="mylist">
            <h2>MY LIST</h2>
            <div className="movie-list">
                {this.state.shows.length === 0 && <p>No movies/shows in your list.</p>}
                {this.state.shows && this.state.shows.map((show) => {
                    return (<div className="my_movie_holder">
                        <Link to={`/${show.mediaType}/${show.data.id}`} className="my_movie_link">
                            <img className="my_movie_poster my_large_poster"
                                key={show.data.id}
                                src={`${baseImageUrl}${show.data.poster_path}`}
                                alt={show?.data.name || show?.data.title} />
                        </Link>
                        <button  onClick={() => this.removeShow(show.data.id)} className="netflix-btn cancel-btn">Remove</button>
                        </div>)
                })}
            </div>
        </div>
        </React.Fragment>
    )}
}

export default MyList;
