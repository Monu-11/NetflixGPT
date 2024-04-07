import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setIsDropdown(true);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unsubscribe when component mount
    return () => {
      unsubscribe();
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.addEventListener("click", handleClickOutside);
    };
  }, []);

  const handleGptSearch = () => {
    // Toggle GPT Search button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen md:px-8 md:py-2 px-4 py-2  bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-36 md:w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {user && (
        <div className="relative" ref={dropdownRef}>
          <div className="flex md:p-2 justify-between">
            {showGptSearch && (
              <select
                className="p-2 m-2 bg-gray-900 text-white"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGptSearch}
              className="py-2 px-4 my-2 bg-purple-800 text-white mx-4 rounded-lg"
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <img
              onClick={handleDropdown}
              className="md:w-12 md:h-12 w-10 h-10  mx-2 rounded-full cursor-pointer"
              src={user.photoURL}
              alt="profile"
            />
          </div>
          {isDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10">
              <h1 className="block px-4 py-2 font-bold text-grey-700 w-full text-center rounded-lg">
                {user.displayName}
              </h1>
              <button
                onClick={handleSignOut}
                className="block px-4 py-2 font-bold text-white hover:bg-red-900 w-full text-center bg-red-700 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
