import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";

import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/message.thunk";
import SendMessage from "./SendMessage";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { messages } = useSelector((state) => state.messageSlice);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);
  return (
    <>
      {!selectedUser ? (
        <div className="w-full flex justify-center items-center flex-col gap-5">Please select user to chat</div>
      ) : (
        <div className="h-screen w-full flex flex-col">
          <div className="border-b border-b-white/10 p-3">
            <User userDetails={selectedUser} />
          </div>
          <div className="h-full overflow-y-auto p-3">
            {messages?.map((messageDetails) => {
              return <Message key={messageDetails?._id} messageDetails={messageDetails}/>;
            })}
          </div>
          <SendMessage/>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
