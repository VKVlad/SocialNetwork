import React from "react";
import { navigationMenu } from "./SideBarNavigation";
import { Avatar, Card, Divider, Menu, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../Redux/Auth/auth.action";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
    if (item.title === "Profile") {
      navigate(`/profile/${auth.user?.id}`);
    } else {
      navigate(item.path);
    }
  };

  return (
    <Card className="card h-screen flex flex-col justify-between py-5 ">
      <div className="space-y-8 pl-5">
        <div className="">
          <span className="logo font-bold text-xl">SafeNet</span>
        </div>

        <div className="space-y-8">
          {navigationMenu.map((item) => (
            <div
              onClick={() => handleNavigate(item)}
              className="cursor-pointer flex space-x-4 items"
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src={auth.user.avatarUrl} />
            <div>
              <p className="font-bold">
                {auth.user?.firstName + " " + auth.user?.lastName}
              </p>
              <p className="opacity-70">
              {"@" + auth.user?.username}
              </p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              key={auth.user?.id}
              onClick={() => {
                handleClose();
                dispatch(logoutUserAction());
                navigate("/login");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
