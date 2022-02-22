import { Link } from "react-router-dom";

import classes from "./NavItem.module.scss";
import cn from "classnames";

export default function NavItem({title, target, number, back}) {
  return (
    <li className={classes["navigation__list--item"]}>
      <div className={`line line__${number}`}></div>
      <div className="diamond"></div>
      <Link to={`${target}`}>
        <h2 className={cn(classes["navigation__list--link"], "heading heading__2", classes[back])}>
          {title}
        </h2>
      </Link>
    </li>
  );
}
