import * as React from "react";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { navbarTrainigData } from "../../constants/navbarTrainingData";
import { useEffect } from "react";

function Training() {
  const theme = useTheme();
  const navigate = useNavigate();
  const path = useLocation().pathname;



  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        marginTop: "-20px",
        backgroundColor: "white",
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "violet" }}
      >
        <Tabs
          value={path}
          
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {navbarTrainigData.map((elem, i) => (
            <Tab
              label={elem.name}
              value={elem.path}
              onClick={() => navigate(elem.path)}
            />
          ))}
        </Tabs>
      </AppBar>
      <Outlet />
    </Box>
  );
}
export default Training;
