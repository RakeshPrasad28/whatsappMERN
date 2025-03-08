import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { LoginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state => state.userSlice)
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate('/')
    }
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    console.log("loginData");
    const response = await dispatch(LoginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg ">
        <h2 className="text-xl text-center">Please Login..!!</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <IoKeySharp />
          <input
            type="password"
            className="grow"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
        <p>
          Don't have an account? &nbsp;{" "}
          <Link to="/signup" className="text-blue-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
