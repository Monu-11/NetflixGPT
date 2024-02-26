import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispath = useDispatch();

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );

    const json = await data.json();

    dispath(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    getNowPlayingMovies();

    // eslint-disable-next-line
  }, []);
};

export default useNowPlayingMovies;
