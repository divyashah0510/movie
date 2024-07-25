# Movie Web App - TvFlix

For this project create a file in js folder namely `api.js` for adding api key and base url.

```javascript
    "use strict";

    const api_key = "Your_API_Key";
    const imageBaseUrl = "https://image.tmdb.org/t/p/";

    const fetchDataFromServer = async (url, callback, optionalParams) => {
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
        callback(data, optionalParams);
        });
    };

    export { fetchDataFromServer, api_key, imageBaseUrl };
```
