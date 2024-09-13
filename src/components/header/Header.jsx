import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../stores/slices/authSlice";
import "./header.css";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };
  const handleEditProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="header">
      <h1 className="header-title">書籍レビューアプリ</h1>
      {auth ? (
        <div>
          <button className="edit-button" onClick={handleEditProfile}>
          ユーザー情報編集
          </button>
          <br />
          <button className="sign-out-button" onClick={handleSignOut}>
          サインアウト
          </button>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};
