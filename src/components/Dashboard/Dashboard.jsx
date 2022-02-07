import Navigation from '../common/Navigation';
import ProfileContainer from '../Dashboard/UserProfile/UserProfileContainer';
import SettingsContainer from '../Dashboard/Settings/SettingsContainer';

import classes from './Dashboard.module.scss';

export default function Dashboard() {
	return (
		<>
			<Navigation />
			<main>
				<div className={classes.user}>
					<ProfileContainer />
					<SettingsContainer />
				</div>
			</main>
		</>
	);
}
