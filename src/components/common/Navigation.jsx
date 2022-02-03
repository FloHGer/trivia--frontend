import {useLocation} from 'react-router-dom';


import NavItem from './NavItem';

import classes from '../../sass/components/Navigation.module.scss';

export default function Navigation({children}) {
	const path = useLocation().pathname;
	console.log(path)
	return (
		<>
			<header className={classes.navi}>
				<nav className={classes.navigation}>
					<ul className={classes.navigation__list}>
						<NavItem
							title={'Statistics'}
							target={'stats'}
							number={'1'}
						/>
						<NavItem
							title={'Rankings'}
							target={'ranks'}
							number={'2'}
						/>
						<NavItem
							title={'Feedback'}
							target={'feedback'}
							number={'3'}
						/>
						<NavItem
							title={'About us'}
							target={'about'}
							number={'4'}
						/>
						{path !== '/' &&
							<NavItem
								title={'Home'}
								target={''}
								number={'5'}
							/>
						}
					</ul>
				</nav>
			</header>
			{children}
		</>
	);
}
