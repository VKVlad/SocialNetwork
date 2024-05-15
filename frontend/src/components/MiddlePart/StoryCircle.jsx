import { Avatar } from "@mui/material";
import React from "react";

const StoryCircle = () => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src="https://cdn.pixabay.com/photo/2020/06/30/10/23/icon-5355896_640.png"
        >

        </Avatar>
        <p>cidewith...</p>
      </div>
    </div>
  );
};

export default StoryCircle;
