import React, { useEffect } from "react";
import UserSideBar from "./UserSideBar";
import MessageContainer from "./MessageContainer";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket/socket.slice";
import { setNewMessage } from "../../store/slice/message/message.slice";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated,userProfile } = useSelector((state) => state.userSlice);
  const { socket } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(()=>{
    if(!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (message) => {
      dispatch(setNewMessage(message));
    });
    return ()=>{
      socket.close();
    }
  },[socket])
  return (
    <div className="flex">
      <UserSideBar />
      <MessageContainer />
    </div>
  );
};

export default Home;
