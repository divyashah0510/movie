"use strict";
import { imageBaseUrl } from "./api.js";

export function createMovieCard(movie) {
  const { poster_path, title, release_date, vote_average, id } = movie;

  const card = document.createElement("div");
  card.classList.add("movie-card");
  card.innerHTML = `
    <figure class="poster-box card-banner">
      <img
        src="${imageBaseUrl}w342${poster_path}"
        alt="${title}"
        class="img-cover"
        loading="lazy"
      />
    </figure>
    <h4 class="title">${title}</h4>
    <div class="meta-list">
      <div class="meta-item">
        <img
          src="./assets/images/star.png"
          alt="rating"
          loading="lazy"
          width="20"
          height="20"
        />
        <span class="span">${vote_average.toFixed(1)}</span>
      </div>
      <div class="card-badge">${release_date.split("-")[0]}</div>
    </div>
    <a
      href="./detail.html"
      class="card-btn"
      title="${title}"
    ></a>
  `;
  return card;
}
