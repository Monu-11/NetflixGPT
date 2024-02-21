import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const dropdownRef = useRef(null);

  const handleDropdown = () => {
    setIsDropdown(true);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

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

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="relative" ref={dropdownRef}>
          <img
            onClick={handleDropdown}
            className="w-12 h-12 mx-2 rounded-full cursor-pointer"
            src={user?.photoURL}
            alt="netflix"
          />
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
