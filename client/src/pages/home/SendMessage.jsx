import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";

const SendMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userSlice);
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="w-full p-3 flex gap-2">
      <input
        type="text"
        placeholder="Type here..."
        className="input input-bordered input-primary w-full"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSendMessage}
        className="btn btn-square btn-outline btn-primary"
      >
        <IoIosSend />
      </button>
    </div>
  );
};

export default SendMessage;
