import AuthorCard from "../components/About/AuthorCard";

import natalia from '../img/natalia.png';
import flo from '../img/flo.png';
import tobi from '../img/tobi.png';

import classes from "./../sass/pages/Authors.module.scss";

export default function Authors() {
    return (
        <main className={classes.container}>
            <div className={classes.item1}>
                <AuthorCard
                    name={'Natalia'}
                    nickname={'Bob Ross'}
                    src={natalia}
                    github={'/diebanz'}
                    homepage={'diebanz.works'}
                    email={'banznatalia@gmail.com'}
                />
            </div>
            <div className={classes.item2}>
                <AuthorCard
                    name={'Flo'}
                    nickname={'FloH'}
                    src={flo}
                    github={'/FloHGer'}
                    homepage={'FlorianHoehle.de'}
                    email={'mail@FlorianHoehle.de'}
                />
            </div>
            <div className={classes.item3}>
                <AuthorCard
                    name={'Tobi'}
                    nickname={'TimTom'}
                    src={tobi}
                    github={'/Tobi-LoFu'}
                    homepage={''}
                    email={''}
                />
            </div>
        </main>
    );
}
