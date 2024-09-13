import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { url } from "../../const";
import "./editProfile.css";

export const EditProfile = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrorMessage("");
  }
  const onHome = () => {
    navigate("/");
  };

  const onUpdateProfile = () => {
    const data = { name: name };
    axios
      .put(`${url}/users`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        setErrorMessage(`ユーザー情報の更新に成功しました`);
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の更新に失敗しました : ${err.response.data.ErrorMessageJP}`);
      });
  };

  useEffect(() => {
    if (auth) {
      axios
        .get(`${url}/users`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => {
          setName(res.data.name);
        })
        .catch((err) => {
          setErrorMessage(`ユーザー情報の取得に失敗しました : ${err.response.data.ErrorMessageJP}`);
        });
    }
  }, []);

  return (
    <div>
      <main className="edit-profile">
        <h2>ユーザー情報編集</h2>
        <p className="error-message">{errorMessage}</p>

        <form className="edit-form">
          <label className="name-label">ユーザ名</label>
          <br />
          <input
            type="text"
            id="name"
            className="name-input"
            value={name}
            onChange={handleNameChange}
          />
          <br />
          <button
            type="button"
            className="set-button"
            onClick={onUpdateProfile}
          >
            更新
          </button>
          <button
            type="button"
            className="home-button"
            onClick={onHome}
          >
            ホーム
          </button>
        </form>
      </main>
    </div>
  );
};
