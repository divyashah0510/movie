"use strict";

const api_key = "5aaa1465742c1fa96ef61d7ac8b8860c";
const imageBaseUrl = "https://image.tmdb.org/t/p/";

const fetchDataFromServer = async (url, callback, optionalParams) => {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      callback(data, optionalParams);
    });
};

export { fetchDataFromServer, api_key, imageBaseUrl };
