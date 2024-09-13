import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { url } from "../../const";
import { Loading } from "../../components/loading/Loading";
import "./detailReview.css";

export const DetailReview = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const review = useParams();
  const [response, setResponse] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(true);

  const onHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (auth) {
      axios
        .get(`${url}/books/${review.id}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setErrorMessage(`書籍レビューの取得に失敗しました : ${err.response.data.ErrorMessageJP}`);
          setLoading(false);
        })
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <main className="detail-review">
        <h2>レビュー詳細</h2>
        <p className="error-message">{errorMessage}</p>

        {response && (
          <div className="detail-form">
            <div className="review-title">
              タイトル : {response.title}
            </div>
            <div className="review-url">
              URL : <Link to>{response.url}</Link>
            </div>
            <div className="review-detail">
              詳細 : {response.detail}
            </div>
            <div className="review-text">
              本文 : {response.review}
            </div>
            <div className="review-reviewer">
              レビュワー : {response.reviewer}
            </div>
          </div>
        )}
        <button
          type="button"
          className="home-button"
          onClick={onHome}
        >
          ホーム
        </button>
      </main>
    </div>
  );
}
