import React, { useEffect, useState } from "react";
import classes from "./ResultList.module.css";
import SearchForm from "../SearchForm/SearchForm";
import MovieDetail from "../../MovieList/MovieDetail";

const ResultsList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movieDetails, setMovieDetails] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [film, setFilm] = useState("");
  const [movieInfo, setMovieInfo] = useState("");
  const [video, setVideo] = useState("");
  const [listResult, setListResult] = useState("");
  // Sử dụng hook useRequest để gửi yêu cầu tìm kiếm phim
  const token = localStorage.getItem("token");
  useEffect(() => {
    const listSearchMovie = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/movies/search",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              keyword: searchValue,
            }),
          }
        );
        const data = await response.json();
        setListResult(data);
      } catch (err) {
        console.log("error", err);
      }
    };
    listSearchMovie();
  }, [searchValue, token]);
  console.log(listResult);
  // Xử lý sự kiện khi người dùng chọn một phim từ kết quả tìm kiếm
  const filmHandler = (id, movie) => {
    if (id !== film) {
      setMovieDetails(true);
      setFilm(id);
      setMovieInfo(movie);
    } else {
      //ẩn Moviedetail
      setMovieDetails(false);
      setFilm("");
      setMovieInfo("");
    }
  };
  console.log(movieInfo);
  console.log("video", video);

  // Sử dụng useEffect để kiểm tra kết quả tìm kiếm và hiển thị thông báo nếu không có kết quả
  useEffect(() => {
    if (listResult.results && listResult.results.length > 0) {
      setSearchResult(true);
    } else {
      setSearchResult(false);
    }
  }, [listResult]);
  // Sử dụng useEffect để gửi yêu cầu để lấy video phim khi người dùng chọn một phim
  useEffect(() => {
    if (film) {
      const fetchKey = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/movies/video?filmid=${film}`,
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await response.json();
          if (data.results.length > 0) {
            setVideo(
              data.results.filter((mov) => mov.type === "Trailer")[0].key
            );
          } else {
            setVideo("");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchKey();
    }
    return;
  }, [film, token]);
  //hàm nhận dữ liệu props từ searchInput
  const handlerSearchValue = (enteredSearch) => {
    setSearchValue(enteredSearch);
  };
  return (
    <>
      <SearchForm searchInput={handlerSearchValue} />
      <div className={classes.search_results}>
        <h2>Search Results</h2>
        {searchResult ? (
          <div className={classes["search-img"]}>
            {listResult.results.map((film) => (
              <img
                key={film.id}
                className={classes.imageSearch}
                onClick={() => filmHandler(film.id, film)}
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                alt=""
              />
            ))}
          </div>
        ) : (
          <h2 className={classes.err}>không tìm thấy phim</h2>
        )}

        {/* nếu moveDetail = true  hiển thị trang chi tiết của phim*/}
        {movieDetails && (
          <MovieDetail
            name={movieInfo.name ? movieInfo.name : movieInfo.title}
            date={
              movieInfo.release_date
                ? movieInfo.release_date
                : movieInfo.first_air_date
            }
            vote={movieInfo.vote_average}
            overview={
              movieInfo.overview ? (
                movieInfo.overview
              ) : (
                <p>Không có bản tóm tắt cho phim này!</p>
              )
            }
            id={video}
            posterPath={`https://image.tmdb.org/t/p/w500/${movieInfo.backdrop_path}`}
          />
        )}
      </div>
    </>
  );
};
export default ResultsList;
