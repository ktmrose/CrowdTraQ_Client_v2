import React from 'react';
import { useForm } from 'react-hook-form';
import './SessionStart.css'

const SessionStart = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        console.log(data);
        //TODO: send data to server
    }


    return (
        <div className="container">
            <h1>Enter room code:</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <input 
                    type="text"
                    name="room-code"
                    {...register("room-code")}
                    pattern="^[a-zA-Z0-9]+$"
                    title="Numbers and letters only"
                />
                <button className="btn">Enter</button>
            </form>
        </div>
    )
}

export default SessionStart;