import QuestionAnswer from "./QuestionAnswer";
import Card from "../../components/common/Card";
import FadeOut from "../../components/common/FadeOut";
import { useShowQuestion } from "../../context/gameContext";

import classes from "../../sass/pages/Question.module.scss";

export default function Question() {
    const [showQuestion] = useShowQuestion();

    const answers = [showQuestion.question.correct_answer, ...showQuestion.question.incorrect_answers]
    answers.sort(() => (Math.random() > .5) ? 1 : -1);

    return (
        <div>
            <Card>
                <h2 className={classes.question}>
                    {showQuestion.question.question}
                </h2>
                <div className={classes.question__container}>
                    <QuestionAnswer letter="A" text = {answers[0]}/>
                    <QuestionAnswer letter="B" text = {answers[1]}/>
                </div>
                <div
                    className={classes.question__container}
                    style={{visibility: showQuestion.type === 'boolean' ? 'collapse' : 'visible'}}
                >
                    <QuestionAnswer letter="C" text = {answers[2]}/>
                    <QuestionAnswer letter="D" text = {answers[3]}/>
                </div>
            </Card>
            <FadeOut />
        </div>
    );
}

