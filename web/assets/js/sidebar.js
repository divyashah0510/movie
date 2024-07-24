"use strict";

import { api_key, fetchDataFromServer, imageBaseUrl } from "./api.js";

export function sidebar() {
  const genreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");
  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Genre</p>
    </div>
    <div class="sidebar-list">
      <p class="title">Languages</p>
      <a href="./movie-list.html" class="sidebar-link">English</a>
      <a href="./movie-list.html" class="sidebar-link">Hindi</a>
      <a href="./movie-list.html" class="sidebar-link">Gujarati</a>
    </div>
    <div class="sidebar-footer">
      <p class="copyright">CopyRight 2024 <a href="#">divyashah</a></p>
      <img
        src="./assets/images/tmdb-logo.png"
        alt="the movie database logo"
        width="130"
        height="17"
      />
    </div>
  `;
  const genreLink = function () {
    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", `./movie-list.html`);
      link.setAttribute("menu-close", "");
      link.textContent = genreName;
      sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link);
    }
    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay =document.querySelector("[overlay]");
    addEventOnElments(sidebarTogglers, "click", () => {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });
    addEventOnElments(sidebarClose, "click", () => {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}
