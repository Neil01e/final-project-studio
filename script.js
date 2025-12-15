const API_KEY = "e6aa6c57521ab858c1bcaff4ba180eb8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const movieContainer = document.getElementById("movie-container");
const searchInput = document.getElementById("search");

async function fetchMovies(query = "") {
  const url = query
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${
        movie.poster_path
          ? IMG_URL + movie.poster_path
          : "https://via.placeholder.com/500x750?text=No+Image"
      }" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span>⭐ ${movie.vote_average}</span>
        <p>${movie.overview.slice(0, 100)}...</p>
      </div>
    `;

    movieContainer.appendChild(movieCard);
  });
}

searchInput.addEventListener("input", (e) => {
  fetchMovies(e.target.value);
});

fetchMovies();
