
import UserDataContainer from "./UserData/UserDataContainer";
import UserInfoCard from "./UserInfo/UserInfoCard";

import classes from "./UserProfileContainer.module.scss";

export default function UserProfileContainer() {
    return (
        <section className={classes.profile}>
            <UserInfoCard />
            <UserDataContainer />
        </section>
    );
}
