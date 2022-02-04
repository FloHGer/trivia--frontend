import Navigation from '../components/common/Navigation';
import ProfileContainer from '../components/Dashboard/UserProfile/UserProfileContainer';
import SettingsContainer from '../components/Dashboard/Settings/SettingsContainer';

import classes from './../sass/pages/UserProfile.module.scss';

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
