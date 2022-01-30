

import LogSquare from "../common/LogSquare";
import CardGameDashboard from "../components/UserProfile/CardGameDashboard";
import CardUserProfile from "../components/UserProfile/CardUserProfile";

import classes from "./../sass/pages/UserProfile.module.scss";

export default function UserProfile() {
    return (
        <div className={classes.user}>
            <LogSquare />
            <CardUserProfile />
            <CardGameDashboard />
        </div>
    );
}

