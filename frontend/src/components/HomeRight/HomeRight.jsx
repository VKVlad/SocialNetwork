import React, { useEffect, useState } from "react";
import SearchUser from "../SearchUser/SearchUser";
import PopularUserCard from "./PopularUserCard";
import { Card } from "@mui/material";
import { getRecomendationAction } from "../../Redux/Auth/auth.action";
import { useDispatch, useSelector } from "react-redux";

const HomeRight = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store=>store);

  const [isFromMain, setIsFromMain] = useState(true);

  useEffect(() => {
    dispatch(getRecomendationAction());
  }, []);

  return (
    <div className="pr-5">
       {isFromMain && <SearchUser isFromMain={isFromMain} />}
      <Card className="p-5">
        <div className="flex justify-between py-7 items-center">
          <p className="tracking-normal font-semibold opacity-70">
            Suggestions for You
          </p>
        </div>

        <div className="space-y-2">
          {auth.recommendUsers?.map((item) => (
            <PopularUserCard item={item}/>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeRight;
