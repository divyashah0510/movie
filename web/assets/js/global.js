"use strict";

// Add event on mulitple elements

const addEventOnElments = (elements, eventType, callback) => {
    for (const elem of elements) {
        elem.addEventListener(eventType, callback);
    }
};


// Toggle search on mobile devices || small screen


const searchBox = document.querySelector("[search-box]");
const searchToggler = document.querySelectorAll("[search-toggler]");

addEventOnElments(searchToggler,"click",()=>{
    searchBox.classList.toggle("active");
})


const getMovieDetail = (movieId) => {
    window.localStorage.setItem("movieId", String(movieId));
}