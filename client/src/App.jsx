import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {  getUserProfileThunk } from "./store/slice/user/user.thunk";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileThunk());
    
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
