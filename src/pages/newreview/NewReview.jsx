import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { url } from "../../const";
import "./newReview.css";

export const NewReview = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const onHome = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({reValidateMode: "onSubmit", criteriaMode: "all"});

  const onSubmit = (data) => {
    axios
      .post(`${url}/books`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`書籍レビューの登録に失敗しました : ${err.response.data.ErrorMessageJP}`);
      });
  };

  return (
    <div>
      <main className="new-review">
        <h2>レビュー登録</h2>
        <p className="error-message">{errorMessage}</p>

        <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="review-title-label">タイトル</label>
          <input
            type="text"
            id="title"
            className="title-input"
            {...register("title", {
              required: { value: true, message: "タイトルを入力してください" },
            })}
            placeholder="タイトル"
          />
          <br />
          <label className="review-url-label">URL</label>
          <input
            type="text"
            id="url"
            className="url-input"
            {...register("url", {
              required: { value: true, message: "URLを入力してください" },
            })}
            placeholder="URL"
          />
          <br />
          <label className="review-detail-label">詳細</label>
          <textarea
            type="text"
            id="detail"
            className="detail-input"
            {...register("detail", {
              required: { value: true, message: "詳細を入力してください" },
            })}
            placeholder="詳細"
          />
          <br />
          <label className="review-text-label">本文</label>
          <textarea
            type="text"
            id="text"
            className="text-input"
            {...register("review", {
              required: { value: true, message: "本文を入力してください" },
            })}
            placeholder="本文"
          />
          <br />
          <button type="submit" className="post-rebiew-button">
            登録
          </button>
          <button type="button" className="home-button" onClick={onHome}>
            ホーム
          </button>
        </form>
      </main>
    </div>
  );
};
