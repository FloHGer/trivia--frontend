import AuthorCard from "./AuthorCard";

import natalia from '../../img/natalia.png';
import flo from '../../img/flo.png';
import tobi from '../../img/tobi_sw.jpg';

import classes from "./About.module.scss";

export default function About() {
    return (
        <main className={classes.main}>
            <AuthorCard
                className={classes.item1}
                name={'Natalia'}
                nickname={'Bob Ross'}
                src={natalia}
                github={'/diebanz'}
                email={'banznatalia@gmail.com'}
                homepage={'diebanz.works'}
            />
            <AuthorCard
                className={classes.item2}
                name={'Florian'}
                nickname={'FloH'}
                src={flo}
                github={'/FloHGer'}
                email={'mail@FlorianHoehle.de'}
                homepage={'FlorianHoehle.de'}
            />
            <AuthorCard
                className={classes.item3}
                name={'Tobias'}
                nickname={'TimTom'}
                src={tobi}
                github={'/Tobi-LoFu'}
                email={'tobler@gmx.com'}
                // homepage={''}
            />
        </main>
    );
}
