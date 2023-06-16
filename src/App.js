import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import Alert from "./Paiges/Alert";
import Boxadd from "./Paiges/Boxadd";
import Home from "./Paiges/Home";
import Login from "./Paiges/Login";
import Message from "./Paiges/Message";
import RCHList from "./Paiges/RechargeList";
import Registration from "./Paiges/Registration";
import Setting from "./Paiges/Settings";
import DocumentReader from "./Components/DocumentReader";

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
      <Route path="/details" element={<Details />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/download" element={<DocumentReader />} />
    </Routes>
  );
}

export default App;
