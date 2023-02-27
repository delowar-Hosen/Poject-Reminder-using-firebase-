import React from "react";
import { Route, Routes } from "react-router-dom";
import Alert from "./Paiges/Alert";
import Boxadd from "./Paiges/Boxadd";
import Home from "./Paiges/Home";
import Login from "./Paiges/Login";
import Message from "./Paiges/Message";
import RCHList from "./Paiges/RechargeList";
import Registration from "./Paiges/Registration";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/boxadd" element={<Boxadd />} />
      <Route path="/alert" element={<Alert />} />
      <Route path="/message" element={<Message />} />
      <Route path="/rechargelist" element={<RCHList />} />
    </Routes>
  );
}

export default App;
