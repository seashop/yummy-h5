import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, Outlet } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Result from "./pages/Result/Result";
import Analysis from "./pages/Inn/Analysis/Analysis";
import { createRoot } from "react-dom/client";
// console.log("contentBasePath--->", contentBasePath);
const App = () => {
  return (
    <BrowserRouter basename={String(contentBasePath).replace(/\//g, "")}>
      <Routes>
        <Route element={<Home />} path="/home"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Login />} path="/"></Route>
        <Route element={<Result />} path="/result/:sn"></Route>
        <Route element={<Analysis />} path="/analysis"></Route>
        {/* <Route element={<Layout />} path="/children">
          <Route element={<Child1 />} path="/children/child1"></Route>
          <Route element={<Child2 />} path="/children/child2"></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
