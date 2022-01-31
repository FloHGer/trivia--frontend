import classes from "./../../sass/components/Question/QuestionAnswer.module.scss";

function QuestionAnswer({letter, text}) {
    return (
        <div className={classes.answer}>
            <div className={classes.answer__decoration}>
                <div className={classes.answer__letter}>{letter}</div>
            </div>
            <p className={classes.answer__text}>{text}</p>
        </div>
    );
}

export default QuestionAnswer;
