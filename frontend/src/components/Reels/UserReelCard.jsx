import React, { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri"; // Импорт иконки удаления
import { deleteReelAction } from "../../Redux/Reel/reel.action";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  CardHeader,
} from "@mui/material";


const UserReelCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleDeleteReel = () => {
    dispatch(deleteReelAction(item.id));
    window.location.reload();
  };
  return (
    <div
      className="relative w-[15rem] h-[25rem] overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        controlsList="nodownload noremoteplayback"
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        src={item.video}
      />
      {isHovered && (
        <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-50 p-2">
          {location.pathname === "/reels" && (
            <div>
                <CardHeader
                  avatar={
                    <Link to={`/profile/${item.user.id}`}>
                      <Avatar src={item.user.avatarUrl} />
                    </Link>
                  }
                  title={
                    <Link to={`/profile/${item.user.id}`}>
                      <p className="text-white text-xs">{item.user?.firstName + " " + item.user?.lastName}</p>
                    </Link>
                  }
                  subheader={
                    <Link to={`/profile/${item.user.id}`}>
                      <p className="text-white text-xs">{"@" + item.user?.username}</p>
                    </Link>
                  }
                />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p
              className="text-sm font-bold text-white"
              style={{
                fontSize: "1.2rem",
                marginBottom: "10px",
                marginLeft: "10px",
              }}
            >
              {item.title}
            </p>
          </div>
          {location.pathname !== "/reels" && (
          <button
            className="absolute top-0 right-0 text-red-500 hover:text-white p-2"
            onClick={() => handleDeleteReel(item.id)}
          >
            <RiDeleteBin2Line size={20} />
          </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserReelCard;
