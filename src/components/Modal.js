import React from 'react'
import '../css/Modal.css';
import YouTube from 'react-youtube';


function Modal({ trailerUrl, hideVideo }) {

    const opts = {
        width: '640',
        height: '360',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <div className="modal-container" id="modal-container" onClick={() => hideVideo()}>
            <div className="modal">
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </div>
    )
}

export default Modal
