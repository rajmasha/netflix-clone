import React, {useState, useEffect} from 'react';
import "../css/Nav.css";
import { Link } from 'react-router-dom';

function Nav({ alwaysVisible }) {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        if (alwaysVisible) {
            handleShow(true);
        }
        else {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 30) {
                    handleShow(true);
                }
                else {
                    handleShow(false);
                }

                return () => {
                    window.removeEventListener("scroll");
                }
            });
        }

    }, [alwaysVisible]);

    return (
        <div className={`nav ${show && "navShowBg"}`} >

            <div className="nav_links">
                <Link to="/">
                    <img className="netflix_logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" />
                    {/* <h3 style={{ color: "#D81F27" }}>NETFLIX</h3> */}
                </Link>

                <Link to="/"><span className={`${show && "show_item"}`}>Home</span></Link>
                <Link to="/tvshows"><span className={`${show && "show_item"}`}>TV Shows</span></Link>
                <Link to="/movies"><span className={`${show && "show_item"}`}>Movies</span></Link>
                <Link to="/mylist"><span className={`${show && "show_item"}`}>My List</span></Link>
            </div>

            <Link to="/mylist" className="my_list">
                <i className="far fa-bookmark"></i>
                {/* <i className="fas fa-heart"></i> */}
            </Link>
        </div>
    )
}

export default Nav;
