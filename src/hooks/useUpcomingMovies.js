import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";

const useUpcomingMovies = () => {
  const dispath = useDispatch();

  const upcomingMovies = useSelector((store) => store.movies?.upcomingMovies);

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispath(addUpcomingMovies(json.results));
  };

  useEffect(() => {
    !upcomingMovies && getPopularMovies();

    // eslint-disable-next-line
  }, []);
};

export default useUpcomingMovies;
