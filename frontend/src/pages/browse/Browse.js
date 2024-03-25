import React from "react";
import Banner from "../component/banner";
import MovieList from "../MovieList/MovieList";

const token = localStorage.getItem("token");
console.log(token);

if (!token) {
  alert("Hãy đăng nhập để sử dụng toàn bộ tính năng của trang web!");
}

function Browse() {
  return (
    <>
      <Banner />
      <MovieList />
    </>
  );
}

export default Browse;
