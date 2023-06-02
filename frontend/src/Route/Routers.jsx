import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./../component/Login";
import Signup from "../component/Signup";
import PrivateRoute from "./PrivateRoute";
import Report from "../component/Report";
import DeveloperPrivate from "./DeveloperPrivate";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route
        path="/register"
        element={
          <PrivateRoute>
            <Signup />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/reportIssue"
        element={
          <DeveloperPrivate>
            <Report />
          </DeveloperPrivate>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
