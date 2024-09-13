import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form"
import { useParams, useNavigate } from "react-router-dom";
import { url } from "../../const";
import "./editReview.css";

export const EditReview = () => {
  const [cookies] = useCookies();
  const review = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const onHome = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  } = useForm({reValidateMode:"onSubmit",criteriaMode:"all"})

  useEffect(() => {
    axios
      .get(`${url}/books/${review.id}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        setResponse(res.data);
        if (!res.data.isMine) {
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMessage(`書籍レビューの取得に失敗しました : ${err.response.data.ErrorMessageJP}`);
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    axios
      .put(`${url}/books/${review.id}`, data, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        navigate(`/`);
      })
      .catch((err) => {
        setErrorMessage(`書籍レビューの更新に失敗しました : ${err.response.data.ErrorMessageJP}`);
      });
  };

  const deleteReview = () => {
    const confirm = window.confirm("書籍レビューを削除しますか？");
    if (confirm) {
      axios
        .delete(`${url}/books/${review.id}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          setErrorMessage(`書籍レビューの削除に失敗しました : ${err.response.data.ErrorMessageJP}`);
        });
    }
  }

  return (
    <div>
      <main className="edit-review">
        <h2>レビュー編集</h2>
        <p className="error-message">{errorMessage}</p>

        <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="review-title-label">タイトル</label>
          {errors.title && `:${errors.title.message}`}
          <input
            className="title-input"
            defaultValue = {response && response.title}
            type="text"
            {...register("title")}
          />
          <br />
          <label className="review-url-label">URL</label>
          {errors.url && `:${errors.url.message}`}
          <input
            className="url-input"
            defaultValue = {response && response.url}
            type="text"
            {...register("url")}
          />
          <br />
          <label className="review-detail-label">詳細</label>
          {errors.detail && `:${errors.detail.message}`}
          <textarea
            className="detail-input"
            defaultValue = {response && response.detail}
            type="textarea"
            {...register("detail")}
          />
          <br />
          <label className="review-text-label">本文</label>
          {errors.review && `:${errors.review.message}`}
          <textarea
            className="text-input"
            defaultValue = {response && response.review}
            type="textarea"
            {...register("review")}
          />
          <br />
          <button type="submit" className="post-rebiew-button">
            更新
          </button>
          <button type="button" className="delete-rebiew-button" onClick={deleteReview}> 
            削除
          </button>
          <button type="button" className="home-button" onClick={onHome}>
            ホーム
          </button>
        </form>
      </main>
    </div>
  );
}
