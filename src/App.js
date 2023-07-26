import React from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import Alert from "./Paiges/Alert";
import Boxadd from "./Paiges/Boxadd";
import Home from "./Paiges/Home";
import Login from "./Paiges/Login";
import RCHList from "./Paiges/RechargeList";
import Registration from "./Paiges/Registration";
import Setting from "./Paiges/Settings";
import DocumentReader from "./Components/DocumentReader";
import Loginuser from "./Private Route/loginUser";
import Logoutuser from "./Private Route/logoutUser";
import Todo from "./Paiges/todo";

function App() {
  return (
    <Routes>
      <Route element={<Loginuser />}>
        <Route path="/" element={<Home />} />
        <Route path="/boxadd" element={<Boxadd />} />
        <Route path="/alert" element={<Alert />} />
        <Route path="/message" element={<Todo />} />
        <Route path="/rechargelist" element={<RCHList />} />
        <Route path="/details" element={<Details />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/download" element={<DocumentReader />} />
      </Route>
      <Route element={<Logoutuser  />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Route>
    </Routes>
  );
}

export default App;
