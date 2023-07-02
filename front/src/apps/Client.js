import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useTranslation } from "react-i18next";
import Navbar from "../layouts/Navbar";
import { CartProvider } from "react-use-cart";
import { me } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { RtlContext } from "../App";
import { socket } from "../utils/socketIo";

export const SocketContext = createContext();

function Client() {
  const isRtl = useContext(RtlContext);
  const dispatch = useDispatch()
  const authStore = useSelector(state => state.auth)

  useEffect(() => {
    let aux = localStorage.getItem('token')
    if (aux) {
      let token = JSON.parse(aux).Authorization
      dispatch(me(token))
    }
  }, [dispatch])
  // for connect
  useEffect(() => {
    if (authStore.me)
      socket.emit('connection', { userId: authStore.me.id })
  }, [authStore.me])
  //for list Connected Users
  
  // for reconnection
  useEffect(() => {
    if (authStore.me) {
      function disconnect(users) {
        socket.emit('connection', { userId: authStore.me.id })
      }
      socket.on(`disconnect/${authStore.me.id}`, disconnect)
      return () => { socket.off(`disconnect/${authStore.me.id}`, disconnect) }
    }
  }, [socket, authStore.me])

  return (
    <div className={`${isRtl}`}>
      <SocketContext.Provider value={socket}>
        <CartProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </CartProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default Client;
