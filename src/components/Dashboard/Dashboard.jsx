import Navigation from '../common/Navigation';
import UserProfileContainer from '../Dashboard/UserProfile/UserProfileContainer';
import SettingsContainer from '../Dashboard/Settings/SettingsContainer';

import classes from './Dashboard.module.scss';

export default function Dashboard() {
	return (
		<>
			<Navigation />
			<main className={classes.main}>
				<div className={classes.user}>
					<UserProfileContainer />
					<SettingsContainer />
				</div>
			</main>
		</>
	);
}
