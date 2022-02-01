import { createContext, useContext, useState} from "react";

const categoryContext = createContext();
const questionContext = createContext();
const showQuestionContext = createContext();
const answerContext = createContext();

export const useCategories = () => useContext(categoryContext);
export const useQuestions = () => useContext(questionContext);
export const useShowQuestion = () => useContext(showQuestionContext);
export const useAnswers = () => useContext(answerContext);

export default function Game({ children }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [questions, setQuestions] = useState([[], [], [], [], [], []]);
    const [showQuestion, setShowQuestion] = useState(null);
    const [allAnswers, setAllAnswers] = useState([[], [], [], [], [], []]);


    return (
        <categoryContext.Provider value={[selectedCategories, setSelectedCategories]}>
        <questionContext.Provider value={[questions, setQuestions]}>
        <showQuestionContext.Provider value={[showQuestion, setShowQuestion]}>
        <answerContext.Provider value={[allAnswers, setAllAnswers]}>
            {children}
        </answerContext.Provider>
        </showQuestionContext.Provider>
        </questionContext.Provider>
        </categoryContext.Provider>
    );
}
