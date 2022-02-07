
import CardUserProfileStats from "./UserData/UserDataContainer";
import CardUserProfileUser from "./UserInfo/UserInfoCard";

import classes from "./UserProfileContainer.module.scss";

export default function UserProfileContainer() {
    return (
        <section className={classes.profile}>
            <CardUserProfileUser />
            <CardUserProfileStats />
        </section>
    );
}
