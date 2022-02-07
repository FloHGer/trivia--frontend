
import CardUserProfileStats from "./UserData/UserDataContainer";
import CardUserProfileUser from "./UserInfo/UserInfoCard";

import classes from "./UserProfileContainer.module.scss";

export default function CardUserProfile() {
    return (
        <section className={classes.profile}>
            <CardUserProfileUser />
            <CardUserProfileStats />
        </section>
    );
}
