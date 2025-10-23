import React from "react";
import { useForm } from "react-hook-form";
import "./SessionStart.css";
import { useWebsocketConnection } from "../context/websocket";

//decomissioned with revised architecture. Revivable if server can handle more than one play session
const SessionStart = (props) => {
  const { connectWebsocket } = useWebsocketConnection();
  const { register, handleSubmit } = useForm();

  const onFormSubmit = (data) => {
    connectWebsocket(data?.roomCode);
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
