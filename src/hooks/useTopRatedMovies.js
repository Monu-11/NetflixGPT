import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispath = useDispatch();

  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispath(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    getTopRatedMovies();

    // eslint-disable-next-line
  }, []);
};

export default useTopRatedMovies;
