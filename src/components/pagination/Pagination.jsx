import { useDispatch } from "react-redux";
import { increment, decrement } from "../../stores/slices/pagesSlice";
import "./Pagination.css";

export const Pagination = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="Pagination">
      {props.page !== 0 ? (
        <div className="Pagination-button">
          <button onClick={() => dispatch(decrement())}>
          前ページ
          </button>
        </div>
      ) : (
        <div className="Pagination-button--disable">
        </div>
      )}
      <span className="Pagination-page">ページ : {props.page + 1}</span>
      {props.length >= 10 ? (
        <div className="Pagination-button">
          <button onClick={() => dispatch(increment())}>
          次ページ
          </button>
        </div>
    ) : (
        <div className="Pagination-button--disable">
        </div>
      )}
    </div>
  );
}
