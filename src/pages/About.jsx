import AuthorCard from "../components/About/AuthorCard";

import classes from "./../sass/pages/Authors.module.scss";

export default function Authors() {
    return (
        <div className={classes.container}>
            <div className={classes.item1}>
                <AuthorCard
                    name={'Natalia'}
                    nickname={'Bob Ross'}
                    github={'/diebanz'}
                    homepage={'diebanz.works'}
                    email={'banznatalia@gmail.com'}
                />
            </div>
            <div className={classes.item2}>
                <AuthorCard
                    name={'Flo'}
                    nickname={''}
                    github={'/FloHGer'}
                    homepage={'FlorianHoehle.de'}
                    email={'mail@FlorianHoehle.de'}
                />
            </div>
            <div className={classes.item3}>
                <AuthorCard
                    name={'Tobi'}
                    nickname={''}
                    github={'/Tobi-LoFu'}
                    homepage={''}
                    email={''}
                />
            </div>
        </div>
    );
}

