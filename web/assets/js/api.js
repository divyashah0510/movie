"use strict";

const api_key = "YOUR_API_KEY";
const imageBaseUrl = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = async (url, callback, optionalParams) => {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data, optionalParams);
    });
};

export { fetchDataFromServer, api_key, imageBaseUrl };
