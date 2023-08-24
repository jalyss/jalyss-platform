import React, { useMemo, createContext, useContext, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../utils/SocketIo";

export const SocketContext = createContext();

function Branch() {
  const { i18n } = useTranslation();
  const isRtl = useMemo(() => i18n?.languages[0] === "ar", [i18n?.languages]);
  const authStore = useSelector((state) => state.auth);

  //for connection
  useEffect(() => {
    if (authStore.meAdmin)
      socket.emit("connection", { userId: authStore.meAdmin.id });
  }, [authStore.meAdmin]);

  // for reconnection
  useEffect(() => {
    if (authStore.meAdmin) {
      function disconnect() {
        socket.emit("connection", { userId: authStore.meAdmin.id });
      }
      socket.on(`disconnect/${authStore.meAdmin.id}`, disconnect);
      return () => {
        socket.off(`disconnect/${authStore.meAdmin.id}`, disconnect);
      };
    }
  }, [socket, authStore.meAdmin]);

  return (
    <SocketContext.Provider value={socket}>
      <div className={`d-flex `}>
        
        <Sidebar />
        <div className="w-100">
          <Header />
          
          <Box
            width="calc(100% - 260px)"
            mr={isRtl && "260px"}
            ml={!isRtl && "260px"}
            mt="80px"
            className="pages"
          >
            <Outlet />
          </Box>
        </div>
      </div>
    </SocketContext.Provider>
  );
}

export default Branch;
