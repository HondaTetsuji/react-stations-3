import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../stores/slices/authSlice";
import { url } from "../../const";
import "./login.css";

export const LogIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm({reValidateMode: "onSubmit", criteriaMode: "all"});

  const onSubmit = (data) => {
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        setErrorMessage("");
        reset();
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました : ${err.response.data.ErrorMessageJP}`);
      });
  };

  if (auth === true) return <Navigate to="/" replace />;

  return (
    <div>
      <main className="signin">
        <h2>ログイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="email-label">メールアドレス</label>
          <input
            type="email"
            id="email"
            className="email-input"
            {...register("email", {
              required: { value: true, message: "メールアドレスを入力してください" },
              pattern: {
                value:
                  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                message: "メールアドレスの形式が違います",
              },
            })}
            placeholder="メールアドレス"
          />
          {errors.email && <div>{errors.email.message}</div>}
          <br />
          <label className="password-label">パスワード</label>
          <input
            type="password"
            id="password"
            className="password-input"
            {...register("password", {
              required: { value: true, message: "パスワードを入力してください" },
            })}
            placeholder="パスワード"
          />
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <input type="submit" value="ログイン" className="signin-button" disabled={!isDirty} />
        </form>
        <Link to="/signup">新規登録</Link>
      </main>
    </div>
  );
}
