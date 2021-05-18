import React from 'react';
import '../css/Casts.css';
import { baseImageUrl } from '../helper/helper';

function CastsRow({ casts }) {

    return (
        <div className="casts_row">
            {casts.length > 0 && <h2>Casts</h2>}
            <div className="cast_section">
                {casts.map(cast => {
                    return (
                        <div className="cast_holder" key={cast.id}>
                            <div>
                                <img className="cast_image"
                                    key={cast.id}
                                    src={`${baseImageUrl}${cast.profile_path}`}
                                    alt={cast.name} />
                            </div>
                            <div>
                                <p className="text-small text-bold">{cast.name}</p>
                                <p className="text-muted text-small">as {cast.character}</p>
                            </div>
                        </div>)
                })}
            </div>

        </div>
    );
}

export default CastsRow;
