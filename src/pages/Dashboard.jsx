import LogSquare from '../components/common/LogSquare';
import ProfileContainer from '../components/Dashboard/UserProfile/UserProfileContainer';
import SettingsContainer from '../components/Dashboard/Settings/SettingsContainer';

import classes from './../sass/pages/UserProfile.module.scss';

export default function Dashboard() {
	return (
		<div className={classes.user}>
			<LogSquare />
			<ProfileContainer />
			<SettingsContainer />
		</div>
	);
}
