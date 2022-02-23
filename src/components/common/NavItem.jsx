import { Link } from "react-router-dom";

import classes from "./NavItem.module.scss";

export default function NavItem({title, target, number, back}) {
  return (
    <li className={classes.listItem}>
      <div className={`${classes.listItem__line} ${classes[`listItem__line__${number}`]}`}></div>
      <div className={`${classes.listItem__diamond}`}></div>
      <Link to={`${target}`}>
        <h2 className={`heading heading__2 ${classes.listItem__link}  ${classes[back]}`}>
          {title}
        </h2>
      </Link>
    </li>
  );
}
