import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import useAxios, { REQ_TYPES } from "../hooks/useAxios";

export default function AddMovieForm(props) {
  const [movies, getData, setMovies] = useAxios({
    title: "",
    director: "",
    genre: "",
    metascore: 0,
    description: "",
  });

  const [error, setError] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    setMovies({
      ...movies,
      [e.target.name]: e.target.value,
    });
  };
  const { title, director, genre, metascore, description } = movies;

  const handleSubmit = (e) => {
    e.preventDefault();
    getData("/movies", REQ_TYPES.POST, "/movies", props.updatedMovies, movies);
  };

  return (
    <div className="bg-white rounded-md shadow flex-1">
      <form onSubmit={handleSubmit}>
        <div className="p-5 pb-3 border-b border-zinc-200">
          <h4 className="text-xl font-bold">
            Ekleniyor <strong>{movies.title}</strong>
          </h4>
        </div>

        <div className="px-5 py-3">
          <div className="py-2">
            <label className="block pb-1 text-lg">Title</label>
            <input
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Director</label>
            <input
              value={director}
              onChange={handleChange}
              name="director"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Genre</label>
            <input
              value={genre}
              onChange={handleChange}
              name="genre"
              type="text"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Metascore</label>
            <input
              value={metascore}
              onChange={handleChange}
              name="metascore"
              type="number"
            />
          </div>
          <div className="py-2">
            <label className="block pb-1 text-lg">Description</label>
            <textarea
              value={description}
              onChange={handleChange}
              name="description"
            ></textarea>
          </div>
          {error && <p> {error} </p>}
        </div>

        <div className="px-5 py-4 border-t border-zinc-200 flex justify-end gap-2">
          <Link to={`/addMovies/1`} className="myButton bg-zinc-500">
            Vazgeç
          </Link>
          <button
            type="submit"
            className="myButton bg-green-700 hover:bg-green-600"
          >
            Ekle
          </button>
        </div>
      </form>
    </div>
  );
}
