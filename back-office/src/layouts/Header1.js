import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import WhiteSelect from "../components/WhiteSelect";
import { useTranslation } from "react-i18next";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import isEnglish from "../helpers/isEnglish";
import { useLanguage } from "../hooks/useLanguage";

const Header1 = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { t, i18n } = useTranslation();

  const currentLanguage = useLanguage();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const open = Boolean(anchorEl);

  const onChangeLanguage = (event) => {
    console.log("hello");
    console.log(event.target.value);
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("lg", event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <AppBar sx={{ background: "#8d99ae", justifyContent: "flex-end" }}> */}
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          background: "#8d99ae",
        }}
      >
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <MenuItem>
                <Typography textAlign="center">
                  <span className="no-icon">Profile</span>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("tokenAdmin");
                      window.location.pathname = "/";
                    }}
                    className="no-icon"
                  >
                    Log out
                  </span>
                </Typography>
              </MenuItem>
            </MenuItem>
            <Typography>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <p>Messages</p>
              </MenuItem>
            </Typography>
            <Typography>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <p>Notifications</p>
              </MenuItem>
            </Typography>
          </Menu>
        </Box>
        <Tabs textColor="inherit" value={1} indicatorColor="#FFF">
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "#FFFFF" }}
          >
            Dashboard
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Tab label="Account" />
          <Tab label="Search" />
        </Tabs>
        <WhiteSelect
          height={30}
          width={70}
          value={currentLanguage}
          onChange={onChangeLanguage}
          data={[
            { label: "AR", value: "ar" },
            { label: "EN", value: "en" },
          ]}
          helper={t("Language")}
          example={() => console.log("done")}
        />
        {/* <Typography sx={{ color: "#57385c", fontSize: "5px" }}> */}
        <img
          alt="logo"
          src="https://jalyss.com/img/prestashop-logo-1610973135.jpg"
        />
        {/* </Typography> */}
      </Toolbar>
      {/* </AppBar> */}
    </>
  );
};

export default Header1;
