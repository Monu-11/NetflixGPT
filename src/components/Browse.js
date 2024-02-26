import Header from "./Header";
import getNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  getNowPlayingMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/* 
        Main Container
         - video background
         - video title
        
        Secondary Container
        - MovieList * n
          - card * n 
      */}
    </div>
  );
};

export default Browse;
