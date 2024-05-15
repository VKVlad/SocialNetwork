import React, { useState } from 'react'
import { Avatar, Button, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { followUserAction } from "../../Redux/User/user.action";
import { isFollowedByReqUser } from "../../utils/checkSavedLiked";

const PopularUserCard = (item) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [isFollowing, setIsFollowing] = useState(isFollowedByReqUser(auth.user.id, item.item));
  const handleFollowUser = async () => {
    await dispatch(followUserAction(item.item.id));
      setIsFollowing(!isFollowing); 
  };

  return (
    
    <div>
         <CardHeader
        avatar={
          <Link to={`/profile/${item.item.id}`}><Avatar src={item.item.avatarUrl}/></Link>
        }
        action={
          isFollowing ? (
            <Button sx={{ borderRadius: "20px" }} variant="outlined" onClick={handleFollowUser}>Unfollow</Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined" onClick={handleFollowUser}>Follow</Button>
          )
        }
        title={<Link to={`/profile/${item.item.id}`}>{item.item.firstName + " " + item.item.lastName}</Link>}
        subheader={<Link to={`/profile/${item.item.id}`}>{"@" + item.item.username}</Link>}
      />
    </div>
  )
}

export default PopularUserCard