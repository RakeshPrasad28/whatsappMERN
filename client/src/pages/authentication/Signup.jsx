import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUserThunk } from "../../store/slice/user/user.thunk";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated} = useSelector(state => state.userSlice)
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender:"male"
  });

  useEffect(() => {
      if(isAuthenticated){
        navigate('/')
      }
    }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async() => {
    if(signupData.password !== signupData.confirmPassword){
      toast.error("Password and Confirm Password should be same");
      return;
    }
    const response = await dispatch(registerUserThunk(signupData));
    if(response?.payload?.success){
      navigate("/")
    }
  };
  return (
    <div className="flex justify-center items-center p-6 min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg ">
        <h2 className="text-xl text-center">SIGNUP</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            className="grow"
            name="fullName"
            placeholder="Full Name "
            onChange={handleInputChange}
          />
        </label>
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
        <label className="input input-bordered flex items-center gap-2 w-full">
          <IoKeySharp />
          <input
            type="password"
            className="grow"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
        </label>
        <div className="input-bordered flex items-center gap-10 w-16 justify-between">
          <label htmlFor="male" className="flex items-center gap-2">
            <input
              id="male"
              type="radio"
              name="gender"
              value="male"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            male
          </label>
          <label htmlFor="female" className="flex items-center gap-2">
            <input
              id="female"
              type="radio"
              name="gender"
              value="female"
              className="radio radio-primary"
              onChange={handleInputChange}
            />
            female
          </label>
        </div>
        <button onClick={handleSignup} className="btn btn-primary">
          SignUp
        </button>
        <p>
          Already have an account? &nbsp;{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
