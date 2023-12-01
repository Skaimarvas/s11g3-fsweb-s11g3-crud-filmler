import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";

//Components
import MovieHeader from "./components/MovieHeader";
import EditMovieFrom from "./components/EditMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";
import AddMovieForm from "./components/AddMovieForm";

import axios from "axios";
import { useHistory } from "react-router-dom";
import useAxios, { REQ_TYPES } from "./hooks/useAxios";

const App = (props) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, getData] = useAxios([]);

  useEffect(() => {
    getData("/movies");
  }, []);

  const updatedMovies = () => {
    getData("/movies");
  };

  const deleteMovie = (id) => {
    getData(`/movies/${id}`, REQ_TYPES.DELETE, "/movies");
  };

  const addToFavorites = (movie) => {
    console.log("APP ADDFAVORITE", movie);
    const someFav = favoriteMovies.some(
      (fav) => fav.id === movie.id || fav.title === movie.title
    );
    setFavoriteMovies((prevFav) =>
      !someFav ? [...prevFav, movie] : [...prevFav]
    );
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>

      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieFrom />
            </Route>
            <Route path="/movies/add" exact>
              <AddMovieForm movies={movies} updatedMovies={updatedMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie
                deleteMovie={deleteMovie}
                addToFavorites={addToFavorites}
              />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies} />
            </Route>

            <Route path="/">
              <Redirect to="/movies" />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default App;
