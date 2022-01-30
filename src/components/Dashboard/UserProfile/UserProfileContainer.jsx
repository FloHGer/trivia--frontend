
import CardUserProfileStats from "./UserData/UserDataContainer";
import CardUserProfileUser from "./UserInfo/UserInfoCard";

import classes from "../../../sass/components/UserProfile/CardUserProfile.module.scss";

export default function CardUserProfile() {
    return (
        <section className={classes.profile}>
            <CardUserProfileUser />
            <CardUserProfileStats />
        </section>
    );
}
