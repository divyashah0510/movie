"use strict";

import { sidebar } from "./sidebar.js";
import { api_key, fetchDataFromServer, imageBaseUrl } from "./api.js";
import { createMovieCard } from "./movie-card.js";

const movieId = window.localStorage.getItem("movieId");
const pageContent = document.querySelector("[page-content]");

sidebar();

const getGenres = (genreList) => {
  const newGenreList = [];
  for (const { name } of genreList) {
    newGenreList.push(name);
  }
  return newGenreList.join(", ");
};

const getCasts = (castList) => {
  const newCastList = [];
  for (let i = 0, len = castList.length; i < len && i < 10; i++) {
    const { name } = castList[i];
    newCastList.push(name);
  }
  return newCastList.join(", ");
};

const getDirector = (crewList) => {
  const director = crewList.filter(({ job }) => job === "Director");

  const directorList = [];
  for (const { name } of director) {
    directorList.push(name);
  }
  return directorList.join(", ");
};

const filterVideos = (videoList) => {
  return videoList.filter(
    ({ type, site }) =>
      (type === "Trailer" || type === "Clip") && site === "YouTube"
  );
};

fetchDataFromServer(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&append_to_response=casts,videos,images,releases`,
  function (movie) {
    const {
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      vote_average,
      releases: {
        countries: [{ certification }],
      },
      genres,
      overview,
      casts: { cast, crew },
      videos: { results: videos },
    } = movie;
    document.title = `${title} - TvFlix`;
    const movieDetail = document.createElement("div");
    movieDetail.classList.add("movie-detail");
    movieDetail.innerHTML = `
      <div
        class="backdrop-image"
        style="background-image: url('${imageBaseUrl}${"w1280" || "original"}${
      backdrop_path || poster_path
    }')"
      ></div>
      <figure class="poster-box movie-poster">
        <img
          src="${imageBaseUrl}w342${poster_path}"
          alt="${title} poster"
          class="img-cover"
        />
      </figure>
      <div class="detail-box">
        <div class="detail-content">
          <h1 class="heading">${title}</h1>
          <div class="meta-list">
            <div class="meta-item">
              <img
                src="./assets/images/star.png"
                alt="rating"
                width="20"
                height="20"
              />
              <span class="span">${vote_average.toFixed(1)}</span>
            </div>
            <div class="separator"></div>
            <div class="meta-item">${runtime}m</div>
            <div class="separator"></div>
            <div class="meta-item">${release_date.split("-")[0]}</div>
            <div class="separator"></div>
            <div class="meta-item card-badge">${certification}</div>
          </div>
          <p class="genre">${getGenres(genres)}</p>
          <p class="overview">${overview}</p>
          <ul class="detail-list">
            <div class="list-item">
              <p class="list-name">Starring</p>
              <p class="list-value">${getCasts(cast)}</p>
            </div>

            <div class="list-item">
              <p class="list-name">Directed By</p>
              <p class="list-value">${getDirector(crew)}</p>
            </div>
          </ul>
        </div>

        <div class="title-wrapper">
          <h3 class="title-large">Trailers & Clips</h3>
        </div>
        <div class="slider-list">
          <div class="slider-inner"></div>
        </div>
      </div>
    `;
    for (const { key, name } of filterVideos(videos)) {
      const videoCard = document.createElement("div");
      videoCard.classList.add("video-card");
      videoCard.innerHTML = `
        <iframe
          width="500"
          height="294"
          src="https://www.youtube.com/embed/${key}?&them=dark&color=white&rel=0"
          title="${name}"
          frameborder="0"
          allowfullscreen="1"
          class="img-cover"
          loading="lazy"
        ></iframe>
      `;
      movieDetail.querySelector(".slider-inner").appendChild(videoCard);
    }

    pageContent.appendChild(movieDetail);

    // recommendations and similar movies
    fetchDataFromServer(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${api_key}&page=1`,
      addSuggestedMovies
    );
  }
);

const addSuggestedMovies = function ({ results: movieList }, title) {
  const movieListElem = document.createElement("section");
  movieListElem.classList.add("movie-list");
  movieListElem.ariaLabel = "You May Also Like";
  movieListElem.innerHTML = `
      <div class="title-wrapper">
        <h3 class="title-large">You May Also Like</h3>
      </div>
      <div class="slider-list">
        <div class="slider-inner"></div>
      </div>
    `;
  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);

    movieListElem.querySelector(".slider-inner").appendChild(movieCard);
  }

  pageContent.appendChild(movieListElem);
};
