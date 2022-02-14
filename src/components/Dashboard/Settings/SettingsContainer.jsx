import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import Button from '../../common/Button';
import DashboardItem from './DashboardItem';
import {categorySelection} from '../../../common/categorySelection.js';
import {useCategories, useAllCategories} from '../../../context/gameContext';
import { useAuth } from '../../../context/loginContext';

import styles from '../../common/Button.module.scss'
import classes from './SettingsContainer.module.scss';


export default function SettingsContainer() {
	const navigate = useNavigate();
	const [currentUser] = useAuth();
	const [allCategories] = useAllCategories();
	const [selectedCategories, setSelectedCategories] = useCategories();
	
	const [settings, setSettings] = useState('');
	const [gameMode, setGameMode] = useState(settings.gamemode || 'quick');

	// const categorySelection = () => {
	// 	const quickCategories = [...selectedCategories];
	// 	for (let i = 0; quickCategories.length < 6; i++) {
	// 		const newCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
	// 		if (!quickCategories.find(category => category === newCategory)) quickCategories.push(newCategory);
	// 	}
	// 	setSelectedCategories(quickCategories);
	// 	return navigate('/game');
	// };

	useEffect(() => {
		(async () => {
			try{
				const settingsResponse = (await axios.get(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`))
				setSettings(settingsResponse.data.payload.options);
			}catch(err){console.log(err)}
		})();
	}, [currentUser]);


	return (
		<section className={classes.dashboard}>
			<div className={classes.dashboard__game}>

				<DashboardItem
					title={{name: 'Game Mode', shortName: 'gameMode'}}
					values={[
						{name: 'quick', tooltip: 'get random categories', change: () => setGameMode('quick')},
						{name: 'custom', tooltip: 'choose your own categories', change: () => setGameMode('custom')},
						// {name: 'fun', change: setGameMode},
					]}
					type ={'radio'}
				/>
				{gameMode === 'custom' && allCategories && (
					<DashboardItem
						title={{name: 'Select categories', shortName: 'categories'}}
						values={[
							{name: 'Category 1', DBValue: [settings.categories[0]]},
							{name: 'Category 2', DBValue: [settings.categories[1]]},
							{name: 'Category 3', DBValue: [settings.categories[2]]},
							{name: 'Category 4', DBValue: [settings.categories[3]]},
							{name: 'Category 5', DBValue: [settings.categories[4]]},
							{name: 'Category 6', DBValue: [settings.categories[5]]},
						]}
						type ={'select'}
					/>
				)}
			</div>
			<div className={classes.dashboard__button}>
				<div className={classes['dashboard__line--2']}></div>
					<Button className={styles.btn__blue} title='Play!' onClick={() =>
						categorySelection(selectedCategories, setSelectedCategories, allCategories, navigate)} />
			</div>
		</section>
	);
}
