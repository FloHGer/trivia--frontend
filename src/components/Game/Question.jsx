import QuestionAnswer from "./QuestionAnswer";
import Card from "../../components/common/Card";
import FadeOut from "../../components/common/FadeOut";

import classes from "../../sass/pages/Question.module.scss";

function Question({question, answer, reset}) {

    const answers = [question.correct_answer, ...question.incorrect_answers]
    answers.sort(() => (Math.random() > .5) ? 1 : -1);

    return (
        <div>
            <Card>
                <div className={classes.question}>{question.question}</div>
                <div className={classes.question__container}>
                    <QuestionAnswer letter="A" text = {answers[0]}/>
                    <QuestionAnswer letter="B" text = {answers[1]}/>
                </div>
                <div
                    className={classes.question__container}
                    style={{visibility: question.type === 'boolean' ? 'collapse' : 'visible'}}
                >
                    <QuestionAnswer letter="C" text = {answers[2]}/>
                    <QuestionAnswer letter="D" text = {answers[3]}/>
                </div>
            </Card>
            <FadeOut />
        </div>
    );
}

export default Question;
