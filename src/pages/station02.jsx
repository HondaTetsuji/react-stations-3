import React, { useState } from "react";
import "./signin.css";

export const Station02 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [userData, setUserData] = useState("");

  const onSignIn = () => {
    if (email == "" || password == ""){
      setErrorMessage(`サインインに失敗しました。`);
    }else{
      setErrorMessage(`サインインに成功しました。`);
    }
  };

  return (
    <div className="login-form">
      <h3 className="login-form-title">認証</h3>
      {userData && <h5>Welcome {userData.name} !</h5>}
      <p className="error-message">{errorMessage}</p>

      <label htmlFor="mail" className="email-label">
        メールアドレス
      </label>
      <input
        id="mail"
        type="text"
        className="email-input"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />

      <label htmlFor="password" className="password-label">
        パスワード
      </label>
      <input
        id="password"
        type="password"
        className="password-input"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />

      <button className="signin-button" onClick={onSignIn}>
        サインイン
      </button>

    </div>
  );
};
