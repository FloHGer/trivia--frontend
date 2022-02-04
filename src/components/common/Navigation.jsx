import {useLocation} from 'react-router-dom';

import { useAuth } from "../../context/loginContext";
import NavItem from './NavItem';
import Square from './Square';

import classes from '../../sass/common/Navigation.module.scss';


export default function Navigation({children}) {
	const [currentUser] = useAuth();
	const path = useLocation().pathname;


	return (
		<>
			{path !== '/dashboard' &&
			<header className={classes.header}>
				<nav className={classes.navigation}>
					<ul className={classes.navigation__list}>
						<NavItem
							title={'Statistics'}
							target={'/stats'}
							number={'1'}
						/>

						<NavItem
							title={'Rankings'}
							target={'/ranks'}
							number={'2'}
						/>

						<NavItem
							title={'Feedback'}
							target={'/feedback'}
							number={'3'}
						/>

						<NavItem
							title={'About us'}
							target={'/about'}
							number={'4'}
						/>

						{path !== '/' &&
							<NavItem
								title={currentUser ? 'Dashboard' : 'Home'}
								target={currentUser ? '/dashboard' : '/'}
								number={'6'}
							/>
						}
					</ul>
				</nav>
			</header>}


			{path === '/dashboard' &&
			<header className={classes.dashHeader}>
				<nav className={classes.dashNavigation}>
					<Square
						title={'Stats'}
						target={'/stats'}
						size={'15rem'}
					/>

					<Square
						title={'Ranks'}
						target={'/ranks'}
						size={'15rem'}
					/>

					<Square
						title={'Feedback'}
						target={'/feedback'}
						size={'15rem'}
					/>

					<Square
						title={'About us'}
						target={'/about'}
						size={'15rem'}
					/>

					<Square
						title={'LogOut'}
						size={'10rem'}
						onClick={true}
					/>
				</nav>
			</header>
			}
			{children}
		</>
	);
}
