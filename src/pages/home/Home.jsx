import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { url } from "../../const";
import { Pagination } from "../../components/pagination/Pagination";
import "./home.css";

export const Home = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const page = useSelector((state) => state.pages.value);
  const [cookies] = useCookies();
  const [response, setResponse] = useState();

  useEffect(() => {
    if (auth === true) {
      axios
        .get(`${url}/books?offset=${page * 10}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {  
          alert(`エラー : ${err.response.data.ErrorMessageJP}`);
        })
    }
  }, [page]);

  const PostLog = (id) => {
    if (auth === true) {
      axios
        .post(
          `${url}/logs`,
          { selectBookId: id },
          {
            headers: { Authorization: `Bearer ${cookies.token}` },
          },
        )
        .catch((err) => {
          alert(`エラー : ${err.response.data.ErrorMessageJP}`);
        });
    }
  }

  return (
    <div>
      {response && (
        <main>
          <h2>レビュー 一覧</h2>
          <div className="review-title">
            <ul className="review-title__list">
              {response.map((res) => (
                <li key={res.id} className="review-title__list--link">
                  <Link to={`/detail/${res.id}`} onClick={() => PostLog(res.id)}>
                    {Object.values(res.title)}
                  </Link>
                  {res.isMine && (
                    <Link to={`/edit/${res.id}`} className="edit-review-button">
                      編集
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Pagination page={page} length={response.length} />
          <br />
          <Link to="/new">書籍レビュー登録</Link>
        </main>
      )}
    </div>
  );
}
