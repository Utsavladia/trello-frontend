import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";

const AuthForm = ({ mode }: { mode: "signup" | "login" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      ...(mode === "signup" && { name }),
    };

    try {
      const response = await axios.post(
        `https://trello-backend-1tg0.onrender.com/api/auth/${mode}`,
        payload
      );
      console.log("response on login or singup ", response);

      dispatch(
        setToken({
          token: response.data.token,
          name: response.data.name,
          userId: response.data.userId,
        })
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("userId", response.data.userId);
      router.push("/");
    } catch (error: any) {
      alert(error.response?.data?.error || "Request failed");
      console.error(error);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-[4rem]  bg-gray-50 border-gray-300 border gap-8 text-gray-400 rounded-2xl"
      >
        <h1 className="text-5xl font-bold text-black">
          Welcome to <span className="text-indigo-600 ">Workflo!</span>
        </h1>
        {mode === "signup" && (
          <div>
            <input
              id="name"
              placeholder="Name"
              name="name"
              type="name"
              autoComplete="email"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" text-black block w-full bg-gray-100   rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:border focus:border-gray-400 text-xl"
            />
          </div>
        )}
        <div>
          <input
            id="email"
            placeholder="Your email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-black block w-full bg-gray-100   rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:border focus:border-gray-400 text-xl"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 text-black block w-full bg-gray-100  rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:border focus:border-gray-400 text-xl"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-xl font-medium text-white btn-gradient"
        >
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>
        {mode === "login" && (
          <p className="text-center text-xl text-gray-600">
            Don’t have an account? Create a{" "}
            <a
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              new account
            </a>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-center text-xl text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Log in
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
