import React from "react";
import { useForm } from "react-hook-form";
import "./SessionStart.css";
import { Cookies } from "react-cookie";

const SessionStart = (props) => {
  const cookies = new Cookies();
  const { register, handleSubmit } = useForm();

  const onFormSubmit = (data) => {
    //connect with server, if successful, set cookie

    cookies.set("CTQ_TOKEN", data?.roomCode, {
      path: "/",
      secure: true,
      httpOnly: false,
      sameSite: "Strict",
    });
    props.setAccessToken(data?.roomCode);
  };

  return (
    <div className="container">
      <h1>Enter room code:</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input
          type="text"
          name="roomCode"
          maxLength="4"
          {...register("roomCode")}
          pattern="^[a-zA-Z0-9]+$"
          required
          title="Numbers and letters only"
        />
        <button className="btn">Enter</button>
      </form>
    </div>
  );
};

export default SessionStart;
