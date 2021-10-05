import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { auth, login } from "../../../apiRequest/axios";

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
      window.location.replace("/writer");
    } catch (error) {
      const { data } = error.response;
      message.current.innerHTML = data.message;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        try {
          await auth();
          window.location.replace("/writer");
        } catch (error) {
          localStorage.clear();
        }
      })();
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        handlesubmit(e);
      }}
    >
      <input
        name="username"
        onChange={(e) => {
          setusername(e.target.value);
        }}
        value={username}
      />
      <input
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
