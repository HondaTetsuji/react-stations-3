import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../stores/slices/authSlice";
import { url } from "../../const";
import "./signUp.css";

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [icon, setIcon] = useState();
  const [iconUrl, setIconUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm({reValidateMode: "onSubmit", criteriaMode: "all"});

  function handleChangeIcon(e) {
    const file = e.target.files[0];

    new Compressor(file, {
      quality: 0.6,
      maxWidth: 100,
      maxHeight: 100,
      mimeType: 'image/png',
      success(result) {
        setIcon(result);
        setIconUrl(window.URL.createObjectURL(result));
      },
      error(err) {
        console.log(err);
      },
    });
  }

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("icon", icon);
    const object = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    axios
      .post(`${url}/users`, object)
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());

        axios
          .post(`${url}/uploads`, formData, {
            headers: { Authorization: `Bearer ${res.data.token}` },
          })
          .then(() => {
            setErrorMessage("");
            setIconUrl("");
            setIcon("");
            reset();
            navigate("/");
          })
          .catch((err) => {
            setErrorMessage(`画像の登録に失敗しました : ${err.response.data.ErrorMessageJP}`);
          });
      })
      .catch((err) => {
        setErrorMessage(`ユーザー登録の登録に失敗しました : ${err.response.data.ErrorMessageJP}`);
      });
  };

  if (auth === true) return <Navigate to="/" replace />;

  return (
    <div>
      <main className="signup">
        <h2>ユーザー新規登録</h2>
        <p className="error-message">{errorMessage}</p>

        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="name-label">ユーザ名</label>
          <input
            type="text"
            id="name"
            className="name-input"
            {...register("username", {
              required: { value: true, message: "ユーザー名を入力してください" },
            })}
            placeholder="ユーザーネーム"
          />
          {errors.username && <div>{errors.username.message}</div>}
          <br />
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
              minLength: { value: 8, message: "8文字以上入力してください" },
            })}
            placeholder="パスワード"
          />
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <label className="icon">アイコン選択</label>
          <input
            id="icon"
            type="file"
            accept=".jpg,.png"
            required
            onChange={(e) => handleChangeIcon(e)}
          />
          <div className="iconview">
            {iconUrl && <img src={iconUrl} alt="アイコン" />}
          </div>
          <br />
          <input type="submit" value="登録" className="signin-button" disabled={!isDirty} />
        </form>
      </main>
    </div>
  );
}
