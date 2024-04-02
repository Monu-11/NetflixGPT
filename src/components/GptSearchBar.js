import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
// import openai from "../utils/openai";
import genAI from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

// I change openai to gemini api , because it is free, code are written right for openai also

const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // search movie in TMDB Database

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // Make a api call to GPT API and get movie result

    const gptQuery = `Act as a Movie Recommendation system and suggest some movie for the query ${searchText.current.value} only give me names of 5 movies, comma separated like the examplew result given ahead. Example Result: Gadar, Sholey, Don, Golmaal, Koi mil gaya`;
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    // console.log("gptResults", gptResults.choices);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = gptQuery;

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    const gptMovie = result.response.text().split(",");

    // For each movie I will search TMDB API
    const promiseArray = gptMovie.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieResult({ movieNames: gptMovie, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="py-2 m-4 px-4 bg-red-700 text-white rounded-lg col-span-3"
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
