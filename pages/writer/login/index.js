import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { auth, login } from "../../../apiRequest/axios";
import style from "../../../styles/login.module.scss";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const message = useRef(null);
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({ username, password });
      message.current.innerHTML = data.message;
      localStorage.setItem("token", data.token);
      if (data.token_1) {
        localStorage.setItem("token_1", data.token_1);
      }
      window.location.replace("/writer/articles/update");
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        message.current.innerHTML = data.message;
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          await auth();
          window.location.replace("/writer/articles/update");
        } catch (error) {
          localStorage.clear();
        }
      })();
    }
  }, []);

  return (
    <form
      className={style.loginForm}
      onSubmit={(e) => {
        handlesubmit(e);
      }}
    >
      <span>خبر ومقال</span>
      <input
        placeholder="اسم المستخدم"
        name="username"
        onChange={(e) => {
          setusername(e.target.value);
        }}
        value={username}
      />
      <input
        placeholder="كلمة السر"
        name="password"
        type="password"
        value={password}
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <span ref={message}></span>
      <input name="submit" type="submit" />
    </form>
  );
};

export default Login;
