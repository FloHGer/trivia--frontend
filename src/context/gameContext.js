import {createContext, useContext, useState, useEffect} from 'react';
import axios from 'axios';


const allCategoriesContext = createContext();
const categoryContext = createContext();
const questionContext = createContext();
const showQuestionContext = createContext();
const answerContext = createContext();

export const useAllCategories = () => useContext(allCategoriesContext);
export const useCategories = () => useContext(categoryContext);
export const useQuestions = () => useContext(questionContext);
export const useShowQuestion = () => useContext(showQuestionContext);
export const useAnswers = () => useContext(answerContext);


export default function Game({children}) {
	const [allCategories, setAllCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [questions, setQuestions] = useState([
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
		[false, false, false, false, false],
	]);
	const [showQuestion, setShowQuestion] = useState(null);
	const [allAnswers, setAllAnswers] = useState([[], [], [], [], [], []]);

	// FETCH ALL CATEGORIES
	useEffect(() => {
		(async () => {
			try {
				const categoryResponse = (await axios.get('https://opentdb.com/api_category.php')).data.trivia_categories;
				categoryResponse.forEach(
					category =>
						(category.name =
							category.name.startsWith('Entertainment:')
							|| category.name.startsWith('Science:')
								? category.name.slice(category.name.indexOf(' ') + 1)
								: category.name)
				);
				setAllCategories(categoryResponse);
			} catch (err) {console.log(err);}
		})();
	}, []);

	return (
		<allCategoriesContext.Provider value={[allCategories, setAllCategories]}>
			<categoryContext.Provider value={[selectedCategories, setSelectedCategories]}>
				<questionContext.Provider value={[questions, setQuestions]}>
					<showQuestionContext.Provider value={[showQuestion, setShowQuestion]}>
						<answerContext.Provider value={[allAnswers, setAllAnswers]}>
							{children}
						</answerContext.Provider>
					</showQuestionContext.Provider>
				</questionContext.Provider>
			</categoryContext.Provider>
		</allCategoriesContext.Provider>
	);
}
