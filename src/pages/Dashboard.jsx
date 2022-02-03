import LogSquare from '../components/common/LogSquare';
import ProfileContainer from '../components/Dashboard/UserProfile/UserProfileContainer';
import SettingsContainer from '../components/Dashboard/Settings/SettingsContainer';
import Footer from '../components/common/Footer';

import classes from './../sass/pages/UserProfile.module.scss';

export default function Dashboard() {
	return (
		<>
			<main>
				<div className={classes.user}>
					<ProfileContainer />
					<SettingsContainer />
					<LogSquare />
				</div>
			</main>
			<Footer />
		</>
	);
}
