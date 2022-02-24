import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from '../common/Button';
import FeedbackCard from '../common/FeedbackCard';
import Square from "../common/Square";

import classes from "./Feedback.module.scss";

export default function Feedback() {
    const navigate = useNavigate();
    const [rating, setRating] = useState('no rating');
    const [message, setMessage] = useState("");
    const [feedback, setFeedback] = useState(false);

    const ratingData = [1, 2, 3, 4, 5];

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND}/feedback`,
            { feedback: { value: rating, message } }
        );
        if (response.data.message === "success") setFeedback(true);
    };


    return (
        <main className={classes.main}>
            {feedback && (
                <FeedbackCard
                    title={"feedback sent!"}
                    text={"thank you for letting us know!"}
                    onClick={() => navigate("/")}
                />
            )}
            <h1 className={"heading heading__1"}>{"Feedback"}</h1>
            <div className={classes.card}>
                <form onSubmit={(e) => submitHandler(e)}>
                    <h2>{'RATE US:'}</h2>
                    <div 
                    className={classes.ratingContainer}
                    >
                        {ratingData.map((value, i) => (
                            <Square
                                key={i}
                                size={"8rem"}
                                color={value === parseInt(rating) ? 'active' : null}
                            >
                                <label
                                    className={classes.label}
                                >
                                    <p>{i + 1}</p>
                                    <input
                                        type={"radio"}
                                        name={"rating"}
                                        value={i + 1}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                </label>
                            </Square>
                        ))}
                    </div>
                    <h2>{'WRITE US:'}</h2>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={"your message..."}
                    />
                    <Button
                        title={"let us know"}
                        type={"submit"}
                        maxWidth={"40%"}
                        maxHeight={"5rem"}
                        fontSize={"2rem"}
                        disabled={message.length < 5 && rating === 'no rating'}
                    />
                </form>
            </div>
        </main>
    );
}
