import classes from "./../../sass/components/Question/QuestionAnswer.module.scss";

function QuestionAnswer({letter, text}) {
    return (
        <div className={classes.answer} onClick={() => console.log('message')}>
            <div className={classes.answer__decoration}>
                <h3 className={classes.answer__letter}>{letter}</h3>
            </div>
            <p className={classes.answer__text}>{text}</p>
        </div>
    );
}

export default QuestionAnswer;
