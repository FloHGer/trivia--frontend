import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import Button from '../../common/Button';
import DashboardItem from './DashboardItem';
import {categorySelection} from '../../../common/categorySelection.js';
import {useCategories, useAllCategories} from '../../../context/gameContext';
import {useAuth} from '../../../context/loginContext';

import styles from '../../common/Button.module.scss';
import classes from './SettingsContainer.module.scss';

export default function SettingsContainer() {
	const navigate = useNavigate();
	const [currentUser] = useAuth();
	const [allCategories] = useAllCategories();
	const [selectedCategories, setSelectedCategories] = useCategories();

	const [gameMode, setGameMode] = useState('quick');
	const [isLoading, setIsLoading] = useState(true);
	
	const categoryChangeHandler = (newValue, i) => {
		const update = allCategories.filter(category => category.name === newValue)[0];
		console.log(update)
		update === undefined ? selectedCategories[i] = 'choose' : selectedCategories[i] = update;
		setSelectedCategories(selectedCategories);
		patchHandler();
	}

	const patchHandler = async (type = gameMode) => {
		await axios.patch(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`, {
			updates: {
				options: {
					gameMode: type,
					categories: selectedCategories,
				},
			},
		}, {withCredentials: true});
	}

	// get settings
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`);
				setGameMode(response.data.payload.options.gameMode);
				setSelectedCategories(response.data.payload.options.categories);
				setIsLoading(false);
			} catch (err) {console.log(err)}
		})();
	}, [currentUser]);


	return (
		<section className={classes.dashboard}>
			<div className={classes.dashboard__game}>
				<DashboardItem
					title={{name: 'Game Mode', shortName: 'gameMode'}}
					elements={[
						{
							name: 'quick',
							mode: gameMode,
							tooltip: 'get random categories',
							change: () => {
								setGameMode('quick');
								patchHandler('quick');
							},
						},
						{
							name: 'custom',
							mode: gameMode,
							tooltip: 'choose your own categories',
							change: () => {
								setGameMode('custom');
								patchHandler('custom');
							},
						},
					]}
					type={'radio'}
				/>
				{gameMode === 'custom' && allCategories && !isLoading && (
					<DashboardItem
						title={{
							name: 'Select categories',
							shortName: 'categories',
						}}
						type={'select'}
						elements={[
							{
								value: selectedCategories[0],
								change: (newValue, i) => categoryChangeHandler(newValue, i),
							},
							{
								value: selectedCategories[1],
								change: (newValue, i) => categoryChangeHandler(newValue, i),
							},
							{
								value: selectedCategories[2],
								change: (newValue, i) => categoryChangeHandler(newValue, i),
							},
							{
								value: selectedCategories[3],
								change: (newValue, i) => categoryChangeHandler(newValue, i),
							},
							{
								value: selectedCategories[4],
								change: (newValue, i) => categoryChangeHandler(newValue, i),
							},
							{
								value: selectedCategories[5],
								change: (newValue, i) => categoryChangeHandler(newValue, i),
							},
						]}
					/>
				)}
			</div>
			<div className={classes.dashboard__button}>
				<div className={classes['dashboard__line--2']}></div>
				<Button
					className={styles.btn__blue}
					title={'Play!'}
					onClick={() => categorySelection(selectedCategories, setSelectedCategories, allCategories, navigate)}
				/>
			</div>
		</section>
	);
}


	// const selections = selectedCategories.map((category, i) => {
	// 	return {
	// 		name: `Category ${i}`,
	// 		value: category.name,
	// 		change: newValue => {
	// 			selectedCategories[i] = {name: allCategories.filter(category => category.name === newValue)};
	// 			setSelectedCategories(selectedCategories);
	// 			patchHandler('category', i, newValue);
	// 		}
	// 	}
	// })
	// console.log(selections)

