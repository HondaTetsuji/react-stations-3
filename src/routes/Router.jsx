import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { LogIn } from "../pages/login/LogIn";
import { SignUp } from "../pages/signup/SignUp";
import { Home } from "../pages/home/Home";
import { EditProfile } from "../pages/editprofile/EditProfile";
import { NewReview } from "../pages/newreview/NewReview";
import { DetailReview } from "../pages/detailreview/DetailReview";
import { EditReview } from "../pages/editreview/EditReview";
import { NotFound } from "../pages/NotFound";
import { Header } from "../components/header/Header";

import { Station01 } from "../pages/Station01";
import { Station02 } from "../pages/Station02";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/login" element={<LogIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        {auth ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/new" element={<NewReview />} />
            <Route path="/detail/:id" element={<DetailReview />} />
            <Route path="/edit/:id" element={<EditReview />} />
            </>
        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
        <Route exact path="/station01" element={<Station01 />} />
        <Route exact path="/station02" element={<Station02 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
