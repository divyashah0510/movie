"use strict";

import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";
import { sidebar } from "./sidebar.js";

let currentPage = 1;
let totalPages = 0;
const genreName = window.localStorage.getItem("genreName");
const urlParam = window.localStorage.getItem("urlParam");
const pageContent = document.querySelector("[page-content]");

sidebar();

function generateFetchUrl(page, urlParam) {
  return `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=true&page=${page}&${urlParam}`;
}

function createMoviesListSection(genreName) {
  const section = document.createElement("section");
  section.classList.add("movies-list", "genre-list");
  section.ariaLabel = `${genreName} Movies`;
  section.innerHTML = `
    <div class="title-wrapper">
      <h1 class="heading">All ${genreName} Movies</h1>
    </div>
    <div class="grid-list"></div>
    <button class="btn load-more" load-more>Load More</button>
  `;
  return section;
}

function appendMoviesToSection(movieList, section) {
  const gridList = section.querySelector(".grid-list");
  for (const movie of movieList) {
    const movieCard = createMovieCard(movie);
    gridList.appendChild(movieCard);
  }
}

function handleLoadMoreClick(event, section) {
  if (currentPage >= totalPages) {
    event.target.style.display = "none";
    return;
  }
  currentPage++;
  event.target.classList.add("loading");
  fetchDataFromServer(generateFetchUrl(currentPage, urlParam), ({ results: movieList }) => {
    event.target.classList.remove("loading");
    appendMoviesToSection(movieList, section);
  });
}

function initializeMovieList() {
  fetchDataFromServer(generateFetchUrl(currentPage, urlParam), ({ results: movieList, total_pages }) => {
    totalPages = total_pages;
    document.title = `${genreName} Movies - TvFlix`;
    const moviesListSection = createMoviesListSection(genreName);
    appendMoviesToSection(movieList, moviesListSection);
    pageContent.appendChild(moviesListSection);
    document.querySelector("[load-more]").addEventListener("click", function(event) {
      handleLoadMoreClick(event, moviesListSection);
    });
  });
}

initializeMovieList();
search();
