import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import Button from '../../common/Button';
import DashboardItem from './Setting';
import Square from '../../common/Square';
import {useCategories} from '../../../context/gameContext';
import { useAuth } from '../../../context/loginContext';

import styles from '../../../sass/common/Button.module.scss'
import classes from '../../../sass/components/UserProfile/CardGameDashboard.module.scss';


export default function CardGameDashboard() {
	const navigate = useNavigate();
	const [currentUser] = useAuth();
	const [selectedCategories, setSelectedCategories] = useCategories([]);
	
	const [gameMode, setGameMode] = useState(false);
	const [categories, setCategories] = useState([]);
	const [settings, setSettings] = useState();


	const categorySelection = () => {
		const quickCategories = [...selectedCategories];
		for (let i = 0; quickCategories.length < 6; i++) {
			const newCategory = categories[Math.floor(Math.random() * categories.length)];
			if (!quickCategories.find(category => category === newCategory)) quickCategories.push(newCategory);
		}
		setSelectedCategories(quickCategories);
		return navigate('/game');
	};

	useEffect(() => {
		(async () => {
			try{
				const categoryResponse = (await axios.get('https://opentdb.com/api_category.php')).data.trivia_categories;
				categoryResponse.forEach(category =>
					category.name = category.name.startsWith('Entertainment:')
					|| category.name.startsWith('Science:')
					? category.name.slice(category.name.indexOf(' ') + 1)
					: category.name
				);
				setCategories(categoryResponse);
				const settingsResponse = (await axios.get(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`))
				setSettings(settingsResponse);
			}catch(err){console.log(err)}
		})();
	}, []);


	return (
		<section className={classes.dashboard}>
			<div className={classes.dashboard__game}>
				<Square title='trivia' className={classes.dashboard__square} />
				{/* <DashboardItem 
					title = {'Game Timer'}
					type = {'radio'}
					values = {[
						{name: 'off'},
						{name: '10min'},
						{name: '20min'},
						{name: '30min'},
					]}
				/>
				<DashboardItem 
					title = {'Question Timer'}
					type = {'radio'}
					values = {[
						{name: 'on'},
						{name: 'off'}
					]}
				/> */}
				<DashboardItem
					title={{name: 'Game Mode', shortName: 'gameMode'}}
					values={[
						{name: 'quick', tooltip: 'get random categories', change: setGameMode},
						{name: 'custom', tooltip: 'choose your own categories', change: setGameMode},
						// {name: 'fun', change: setGameMode},
					]}
					type ={'radio'}
				/>
				{gameMode === 'custom' && categories && (
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
						categories = {categories}
					/>
				)}
			</div>
			<div className={classes.dashboard__button}>
				<div className={classes['dashboard__line--2']}></div>
					<Button className={styles.btn__blue} title='Play!' onClick={categorySelection} />
			</div>
		</section>
	);
}
