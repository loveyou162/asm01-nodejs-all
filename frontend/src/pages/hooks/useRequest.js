import { useEffect, useState } from "react";

const useRequest = (list) => {
  const [listMovie, setListMovie] = useState([]);
  // Sử dụng useEffect để thực hiện tải danh sách phim khi thay đổi "list"
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Hàm fetchActionMovies sẽ được gọi khi useEffect được chạy
    const fetchActionMovies = async () => {
      try {
        // Thực hiện một yêu cầu HTTP bằng fetch để tải danh sách phim
        const response = await fetch(list, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Fetch failed");
        }
        const data = await response.json();
        // Lưu trữ danh sách phim trong biến listMovie
        setListMovie(data.results);
      } catch (e) {
        console.log("Error: ", e);
      }
    };
    //gọi hàm fetchActionMovie()
    fetchActionMovies();
  }, [list]);
  // Trả về danh sách phim (listMovie) trong một đối tượng
  return { listMovie };
};
export default useRequest;
