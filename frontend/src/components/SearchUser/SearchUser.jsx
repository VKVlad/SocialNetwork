import { Avatar, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";
import { useNavigate } from "react-router-dom";

const SearchUser = ({ isFromMain = false }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {auth}=useSelector(store=>store);


  const handleSearchUser = (e) => {
    const value = e.target.value;
    setUsername(value);
    console.log("search user---------........", auth.searchUsers);
    if (value.length > 0) {
      dispatch(searchUserAction(value));
    }
  };
  const handleClick = (id) => {
    if (!isFromMain) {
      dispatch(createChat({ userId2: id }));
    } else {
      navigate(`/profile/${id}`);
    }
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="search user..."
          onChange={handleSearchUser}
          type="text"
        />
        {username && (
        auth.searchUsers.map((item)=>
        <Card key={item.id} className="absolute w-full z-10 top-[4.5rem] cursor-pointer">
          <CardHeader
            onClick={() => {
              handleClick(item.id);
              setUsername("");
            }}
            avatar={<Avatar src={item.avatarUrl} />}
            title={item.firstName + " " + item.lastName}
            subheader={"@" + item?.username}
          />
        </Card>
        )
      )}
      </div>
    </div>
  );
};

export default SearchUser;
