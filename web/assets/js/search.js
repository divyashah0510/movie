"use strict";
import { api_key, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";

export const search = () => {
  const searchWrapper = document.querySelector("[search-wrapper]");
  const searchField = document.querySelector("[search-field]");
  const searchResultModal = document.createElement("div");
  searchResultModal.classList.add("search-modal");
  document.querySelector("main").appendChild(searchResultModal);
  let searchTimeout = null;
  searchField.addEventListener("input", (e) => {
    if (!searchField.value.trim()) {
      searchResultModal.classList.remove("active");
      searchWrapper.classList.remove("searching");
      clearTimeout(searchTimeout);
      return;
    }
    searchWrapper.classList.add("searching");
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      fetchDataFromServer(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchField.value}&page=1&include_adult=true`,
        ({ results: movieList }) => {
          searchWrapper.classList.remove("searching");
          searchResultModal.classList.add("active");
          searchResultModal.innerHTML = "";
          searchResultModal.innerHTML = `
            <p class="label">Result for</p>
            <h1 class="heading">${searchField.value}</h1>
            <div class="movie-list">
              <div class="grid-list"></div>
            </div>
          `;
          for (const movie of movieList) {
            const movieCard = createMovieCard(movie);
            searchResultModal.querySelector(".grid-list").appendChild(movieCard);
          }
        }
      );
    }, 500);
  });
};
