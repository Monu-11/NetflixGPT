import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = () => {
  const dispath = useDispatch();

  const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispath(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    topRatedMovies && getTopRatedMovies();

    // eslint-disable-next-line
  }, []);
};

export default useTopRatedMovies;
