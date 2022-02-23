import { Link } from "react-router-dom";

import classes from "./NavItem.module.scss";

export default function NavItem({title, target, number, back}) {
  return (
    <li className={classes.listItem}>
      <div className={`${classes.listItem__line} ${classes[`listItem__line__${number}`]}`}></div>
      <Link to={`${target}`}>
        <div className={classes.listItem__link}>
          <div className={`${classes.listItem__link__diamond}`}></div>
          <h2 className={`heading heading__2 ${classes[back]}`}>{title}</h2>
        </div>
      </Link>
    </li>
  );
}
