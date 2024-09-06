import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Station01 } from "../pages/Station01";
import { Station02 } from "../pages/Station02";

export const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/station01" element={<Station01 />} />
        <Route exact path="/station02" element={<Station02 />} />
      </Routes>
    </BrowserRouter>
  );
};
