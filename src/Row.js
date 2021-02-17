import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await axios.get(
                `/movie/${movie.id}/videos?api_key=377e6ad07899822bceee1a77c1281315`
            );
            setTrailerUrl(trailerurl.data.results[0]?.key);
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {/*several row posters*/}
                {movies.map(
                    (movie) =>
                        movie.backdrop_path !== null && (
                            <img
                                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                    }`}
                                alt={movie.name}
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                            />
                        )
                )}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;