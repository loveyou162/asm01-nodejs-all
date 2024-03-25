import React, { useState } from "react";
import "./Authenticate.css";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth-slice";
const Authentication = () => {
  const data = useActionData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginHandler = () => {
    dispatch(authAction.login());
    navigate("/");
  };
  return (
    <>
      <Form method="post" onSubmit={loginHandler} className="form-login">
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <div className="group-input">
          <label htmlFor="username">Tên người dùng:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="group-input">
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Đăng nhập</button>
      </Form>
    </>
  );
};

export default Authentication;
export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  try {
    // Gửi yêu cầu đăng nhập đến server để nhận token
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData), // Sử dụng JSON.stringify để chuyển đối tượng thành chuỗi JSON
    });

    // Kiểm tra nếu fetch thành công
    if (response.ok) {
      const data = await response.json();

      // Lưu token vào localStorage để sử dụng sau này
      localStorage.setItem("token", data.userToken);

      // Gọi hàm onLogin để thông báo cho component cha về việc đăng nhập thành công
      // onLogin();
      return redirect("/");
    } else {
      // Xử lý khi fetch không thành công
      const errorData = await response.json();
      console.error("Đăng nhập thất bại:", errorData.message);
      throw json({ message: errorData.message }, { status: 500 });
      // return redirect("/auth");
    }
  } catch (error) {
    // Xử lý khi có lỗi trong quá trình fetch
    console.error("Đăng nhập thất bại:", error.message);
  }
}
