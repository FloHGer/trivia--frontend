import AuthorCard from "./AuthorCard";

import natalia from '../../img/natalia.png';
import flo from '../../img/flo.png';
import tobi from '../../img/tobi.png';

import classes from "./About.module.scss";

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
                    name={'Florian'}
                    nickname={'FloH'}
                    src={flo}
                    github={'/FloHGer'}
                    homepage={'FlorianHoehle.de'}
                    email={'mail@FlorianHoehle.de'}
                />
            </div>
            <div className={classes.item3}>
                <AuthorCard
                    name={'Tobias'}
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
