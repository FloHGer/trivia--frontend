import AuthorCard from "./AuthorCard";

import natalia from '../../img/natalia.png';
import natalia_qr from '../../img/natalia_qr.png';
import flo from '../../img/flo.png';
import flo_qr from '../../img/flo_qr.png';
import tobi from '../../img/tobi.png';
import tobi_qr from '../../img/tobi_qr.png';

import classes from "./About.module.scss";

export default function About() {
    return (
        <main className={classes.main}>
            <AuthorCard
                className={classes.item1}
                name={'Natalia'}
                nickname={'Bob Ross'}
                src={[natalia, natalia_qr]}
                github={'/diebanz'}
                email={'banznatalia@gmail.com'}
                homepage={'diebanz.works'}
                linked={'/natalia-banz'}
            />
            <AuthorCard
                className={classes.item2}
                name={'Florian'}
                nickname={'FloH'}
                src={[flo, flo_qr]}
                github={'/FloHGer'}
                email={'mail@FlorianHoehle.de'}
                homepage={'FlorianHoehle.de'}
                linked={'/FloHGer'}
            />
            <AuthorCard
                className={classes.item3}
                name={'Tobias'}
                nickname={'TimTom'}
                src={[tobi, tobi_qr]}
                github={'/Tobi-LoFu'}
                email={'tobler@gmx.com'}
                // homepage={''}
                linked={'/T-Pfaffenzeller'}
            />
        </main>
    );
}
