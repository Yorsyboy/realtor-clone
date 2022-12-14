import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { sendPasswordResetEmail, getAuth } from "firebase/auth"; 
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.target.value)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success(`Password reset link has been sent. Please check your email (including spam)`);
    } catch (error) {
      toast.error("Unable to send reset password , please try again!");
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[70%] lg:w-[50%] mb-12 md:mb-6">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_mbginykv.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-full"
          ></lottie-player>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
        <h1 className="text-3xl text-center mt-10 font-bold mb-6 uppercase">Forgot Password</h1>
          <form onSubmit={onSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-4"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign In Instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md
             hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Send Reset password link
            </button>
            <div
              className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300
          after:border-t after:flex-1 after:border-gray-300"
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
