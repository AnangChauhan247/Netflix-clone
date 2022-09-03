import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
// const movieTrailer = require("movie-trailer");
const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchURL, isLargeRow }) {
  //using React-STATES[short time memory, or way of writing variables in react] to strore the info of movies
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //snipet of code that runs based on specific condition/variable
  useEffect(() => {
    //if sq brackets [] are left empty means this piece of code will run only once
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%", 
    playerVars: {
      //https://developers.google.com/youtube.player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* title */}
      <div className="row_posters">
        {/* several row_Posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            } `}
            alt={movie.name}
          />
        ))}
      </div>
      {/* container -> posters */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {/* <YouTube videoId="YVkUvmDQ3HY" opts={opts} /> */}
    </div>
  );
}

export default Row;
