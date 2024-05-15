import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserReelCard from "./UserReelCard";
import { getAllReelsAction } from "../../Redux/Reel/reel.action";

const Reels = () => {
  const { reel } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllReelsAction());
  }, []);

  return (
    <div className="flex justify-center flex-wrap gap-2 my-10">
      {reel.reels.map((item) => (
        <div className="flex justify-center flex-wrap gap-2 my-10">
          <UserReelCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default Reels;
