import axios from "axios";

import { useAuth } from "../../../context/loginContext";
import { useAllCategories } from "../../../context/gameContext";
import classes from "./DashboardItem.module.scss";

export default function DashboardItem({ title, values, type }) {
    const [currentUser] = useAuth();
    const [allCategories] = useAllCategories();

    const changeHandler = async (target, value, i) => {
        if (type === "radio") value.change();
        if (type === "select") value.change(target.value);
        await axios.patch(
            `${process.env.REACT_APP_BACKEND}/user/${currentUser}`,
            {
                updates: {
                    options: {
                        [type === "radio"
                            ? title.shortName
                            : title.shortName[i]]: target.value,
                    },
                },
            },
            { withCredentials: true }
        );
    };

    return (
        <div className={classes.dashboard__item}>
            <h2 className={classes["dashboard__item--category"]}>
                {title.name}
            </h2>
            <div className={classes.valueContainer}>
                {values.map((value, i) => {
                    if (type === "radio") {
                        return (
                            <label
                                key={`${value.name}${i}`}
                                className={classes["dashboard__item--value"]}
                                title={value.tooltip}
                            >
                                {value.name}
                                <input
                                    type={"radio"}
                                    name={title.shortname}
                                    value={value.name}
                                    onClick={(e) =>
                                        changeHandler(e.target, value)
                                    }
                                />
                            </label>
                        );
                    }
                    if (type === "select")
                        return (
                            <select
                                key={`${value.name}${i}`}
                                onChange={(e) =>
                                    changeHandler(e.target, value, i)
                                }
                                className={classes["dashboard__item--select"]}
                            >
                                <option value={""}>{"choose Category"}</option>
                                {allCategories.map((category) => (
                                    <option
                                        value={category.name}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        );
                })}
            </div>
        </div>
    );
}
