

import { FaGithub, FaHome, FaEnvelope } from "react-icons/fa";

import classes from "./AuthorCard.module.scss";

export default function AuthorCard({name, nickname, src, github, homepage, email}) {
    return (
        <div className={classes.container}>
            <div className={classes.item}>
            <img className={classes.picture} 
                src={src}
                alt={name}
            />
                <div className={classes.item__info}>
                    <h2>{name}</h2>
                    <h4>'{nickname}'</h4>
                    <div className={classes["item__info--git"]}>
                        <FaGithub className={classes.item__icons} />
                        <a href={`https://github.com${github}`} target={'_blank'} rel={'noreferrer'}>
                            <h3>{github}</h3>
                        </a>
                    </div>
                    <div className={classes["item__info--page"]}>
                        <FaHome className={classes.item__icons} />
                        <a href={`https://${homepage}`} target={'_blank'} rel={'noreferrer'}>
                            <h3>{homepage}</h3>
                        </a>
                    </div>
                    <a href={`mailto:${email}?subject=Found you on your Trivia Project`}>
                        <div className={classes["item__info--email"]}>
                            <FaEnvelope className={classes.item__icons} />
                            <h3>{email}</h3>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
