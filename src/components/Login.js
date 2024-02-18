import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignForm, setIsSignForm] = useState(true);

  const toggleSignINForm = () => {
    setIsSignForm(!isSignForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c0b69670-89a3-48ca-877f-45ba7a60c16f/2642e08e-4202-490e-8e93-aff04881ee8a/IN-en-20240212-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="Background-image"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black  my-36 mx-auto right-0 left-0 text-white rouned-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {isSignForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignINForm}>
          {isSignForm
            ? "New to Netflix? SignUp Now"
            : "Already registered? SignIn Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
