import { createContext, useContext, useState} from "react";

const categoryContext = createContext();
const loadingContext = createContext();
const showQuestionContext = createContext();
const answerContext = createContext();

export const useCategories = () => useContext(categoryContext);
export const useLoading = () => useContext(loadingContext);
export const useShowQuestion = () => useContext(showQuestionContext);
export const useAnswers = () => useContext(answerContext);

export default function Game({ children }) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isLoaded, setIsLoaded] = useState([]);
    const [showQuestion, setShowQuestion] = useState(false);
    const [allAnswers, setAllAnswers] = useState([[], [], [], [], [], []]);


    return (
        <categoryContext.Provider value={[selectedCategories, setSelectedCategories]}>
        <loadingContext.Provider value={[isLoaded, setIsLoaded]}>
        <showQuestionContext.Provider value={[showQuestion, setShowQuestion]}>
        <answerContext.Provider value={[allAnswers, setAllAnswers]}>
            {children}
        </answerContext.Provider>
        </showQuestionContext.Provider>
        </loadingContext.Provider>
        </categoryContext.Provider>
    );
}
