import { useEffect } from "react";
import useRequest from "../hooks/useRequest";
import ListRender from "./ListRender";
//thực hiện gọi API cho từng danh mục film
const API_KEY = "4c691f4e75ba24f557cb2b19d3860611";
const requests = {
  Trending: `http://localhost:5000/api/movies/trending`,
  NetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`,
  TopRated: `http://localhost:5000/api/movies/top-rate`,
  ActionMovies: `http://localhost:5000/api/movies/discover?genre=28`,
  ComedyMovies: `http://localhost:5000/api/movies/discover?genre=35`,
  HorrorMovies: `http://localhost:5000/api/movies/discover?genre=27`,
  RomanceMovies: `http://localhost:5000/api/movies/discover?genre=10749`,
  Documentaries: `http://localhost:5000/api/movies/discover?genre=99`,
  Search: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`,
};

function MovieList() {
  // sử dụng useRequest để trả về một list phim theo từng danh mục
  const { listMovie: listTrending } = useRequest(requests.Trending);
  const { listMovie: listNetflixOriginals } = useRequest(
    requests.NetflixOriginals
  );
  const { listMovie: listTopRated } = useRequest(requests.TopRated);
  const { listMovie: listActionMovies } = useRequest(requests.ActionMovies);
  const { listMovie: listComedyMovies } = useRequest(requests.ComedyMovies);
  const { listMovie: listHorrorMovies } = useRequest(requests.HorrorMovies);
  const { listMovie: listRomanceMovies } = useRequest(requests.RomanceMovies);
  const { listMovie: listDocumentaries } = useRequest(requests.Documentaries);
  // Tạo một danh sách các danh mục phim
  const list = [
    {
      title: "",
      data: listNetflixOriginals,
      type: "poster_path",
    },
    {
      title: "Xu hướng",
      data: listTrending,
      type: "backdrop_path",
    },
    {
      title: "Xếp hạng cao",
      data: listTopRated,
      type: "backdrop_path",
    },
    {
      title: "Hành động",
      data: listActionMovies,
      type: "backdrop_path",
    },
    {
      title: "Hài",
      data: listComedyMovies,
      type: "backdrop_path",
    },
    {
      title: "Kinh dị",
      data: listHorrorMovies,
      type: "backdrop_path",
    },
    {
      title: "Lãng mạn",
      data: listRomanceMovies,
      type: "backdrop_path",
    },
    {
      title: "Tài liệu",
      data: listDocumentaries,
      type: "backdrop_path",
    },
  ];
  //render kết  quả các danh mục phim ra màn hình
  const renderResult = list.map((item) => {
    return (
      <div key={item.title} className="list">
        <ListRender data={{ ...item }} />
      </div>
    );
  });
  return <div>{renderResult}</div>;
}

export default MovieList;
