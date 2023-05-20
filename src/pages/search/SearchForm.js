import NavIcon from "../browse/NavIcon";
import classes from "./SearchForm.module.css";
import DetailContext from "../browse/Menu/store/detail-context";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import SearchResults from "./SearchResults";
const SearchForm = (props) => {
  const [enteredMovie, setEnteredMovie] = useState(""); //NHẬN DỮ LIỆU TỪ NGƯỜI DÙNG TÌM KIẾM
  const [dataRender, setDataRender] = useState([]); //PUSH API KẾT QUẢ ĐỂ RENDER
  const inputHandler = (event) => {
    setEnteredMovie(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const fetchMeals1 = async (type) => {
      //HÀM XỬ LÝ API
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a4ae14e6dc40d4017e61df4a11712f48&language=en-US&page=1&include_adult=false&query=${type}`
      );
      const responseData = await response.json();
      console.log(responseData.results);
      setDataRender(responseData.results);
    };
    fetchMeals1(enteredMovie);
  };
  const resetHandler = () => {
    setEnteredMovie("");
  };
  console.log(dataRender);
  return (
    <>
      <div className="container">
        <div className={classes.center}>
          <form onSubmit={submitHandler}>
            <input type="text" onChange={inputHandler} value={enteredMovie} />
            <span>
              <svg
                width="25"
                className="svg-inline--fa fa-search fa-w-16"
                fill="#ccc"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </span>
            <div className="d-flex flex-row-reverse bd-highlight mt-2 me-5">
              <button
                type="submit"
                className="btn me-3 fw-bold text-white bg-primary"
              >
                SEARCH
              </button>

              <button
                type="button"
                className="btn me-3 fw-bold"
                onClick={resetHandler}
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="mt-5">
          <p className="text-light fw-bold">Search Result</p>
          <div className="d-flex align-content-start flex-wrap">
            {dataRender.map((el) => (
              <SearchResults key={el.id} poster_path={el.poster_path} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchForm;
