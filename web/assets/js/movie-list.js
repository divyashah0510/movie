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

fetchDataFromServer(
  `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=true&page=${currentPage}&${urlParam}`,
  ({ results: movieList, total_pages }) => {
    totalPages = total_pages;
    document.title = `${genreName} Movies - TvFlix`;
    const moviesListElem = document.createElement("section");
    moviesListElem.classList.add("movies-list", "genre-list");
    moviesListElem.ariaLabel = `${genreName} Movies`;
    moviesListElem.innerHTML = `
      <div class="title-wrapper">
        <h1 class="heading">All ${genreName} Movies</h1>
      </div>
      <div class="grid-list">
        <div class="movie-card">
          <figure class="poster-box card-banner">
            <img
              src="./assets/images/slider-control.jpg"
              alt="Puss in Boots: The Last Wish"
              class="img-cover"
            />
          </figure>
          <h4 class="title">Puss in Boots: The Last Wish</h4>
          <div class="meta-list">
            <div class="meta-item">
              <img
                src="./assets/images/star.png"
                alt="rating"
                loading="lazy"
                width="20"
                height="20"
              />
              <span class="span">7.5</span>
            </div>
            <div class="card-badge">2022</div>
          </div>
          <a
            href="./detail.html"
            class="card-btn"
            title="Puss in the Boots: The Last Wish"
          ></a>
        </div>
      </div>
      <button class="btn load-more" load-more >Load More</button>
    `;

    for (const movie of movieList) {
      const movieCard = createMovieCard(movie);
      moviesListElem.querySelector(".grid-list").appendChild(movieCard);
    }
    pageContent.appendChild(moviesListElem);

    document
      .querySelector("[load-more]")
      .addEventListener("click", function () {
        if (currentPage >= totalPages) {
          this.style.display = "none";
          return;
        }
        currentPage++;
        this.classList.add("loading");
        fetchDataFromServer(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=true&page=${currentPage}&${urlParam}`,
          ({ results: movieList }) => {
            this.classList.remove("loading");
            for (const movie of movieList) {
              const movieCard = createMovieCard(movie);
              moviesListElem.querySelector(".grid-list").appendChild(movieCard);
            }
          }
        );
      });
  }
);


search();