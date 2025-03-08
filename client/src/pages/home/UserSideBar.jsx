import React, { use, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  LogoutUserThunk,
} from "../../store/slice/user/user.thunk";

const UserSideBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { otherUsers, userProfile } = useSelector((state) => state.userSlice);
  // console.log(otherUsers);
  const handleLogout = async () => {
    await dispatch(LogoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue]);

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);
  return (
    <div className="max-w-[20em] w-full h-screen flex flex-col border-r border-r-white/10">
      <h1 className="mx-3 mt-2 px-2 py-1 bg-black text-[#25d366] rounded-lg text-xl font-semibold">
        Whatsapp
      </h1>
      <div className="p-3">
        <label className="input">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            required
            placeholder="Search"
          />
          <IoSearch />
        </label>
      </div>
      <div className="h-full overflow-y-scroll px-3 flex flex-col gap-2">
        {users?.map((userDetails) => (
          <User key={userDetails?._id} userDetails={userDetails} />
        ))}
      </div>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
              <img src={userProfile?.avatar} />
            </div>
          </div>
          <h2 className="text-white/50">{userProfile?.username}</h2>
        </div>
        <button onClick={handleLogout} className="btn btn-primary btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSideBar;
