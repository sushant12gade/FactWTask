import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Homepage from "./Views/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path={"/homepage"} element={<Homepage />} />
          <Route exact path={"/"} element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
