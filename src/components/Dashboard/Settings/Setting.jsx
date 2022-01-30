import axios from "axios";

import { useAuth } from "../../../context/loginContext";
import classes from "./../../../sass/components/UserProfile/Dashboard/DashboardItem.module.scss";


export default function DashboardItem({title, values, type, categories}) {
    const [currentUser] = useAuth();

    const changeHandler = async (target, value, i) => {
        if(type === 'radio') value.change(value.name);
        await axios.patch(`${process.env.REACT_APP_BACKEND}/user/${currentUser}`, {
            updates: {
                options: {
                    [title.shortName[i]]: target.value,
                }
            }
        },{withCredentials: true});
    }

    return (
        <div className={classes.dashboard__item}>
            <h2 className={classes["dashboard__item--category"]}>
                {title.name}
            </h2>
            {values.map((value, i) => {
                if(type === 'radio') return(
                    <label
                        key={`${value.name}${i}`}
                        className={classes["dashboard__item--value"]}
                        title={value.tooltip}
                    >
                        {value.name}
                        <input
                            type = {'radio'}
                            name = {title.shortname}
                            value = {value.name}
                            onChange={e => changeHandler(e.target, value, i)}
                        />
                    </label>
                );
                if(type === 'select') return (
                    <select key={`${value.name}${i}`} onChange={e => changeHandler(e.target, value, i)} 
                    className={classes["dashboard__item--select"]}>
                        {categories.map(category => (
                            <option value={category.name} key={category.id}>{category.name} </option>
                        ))}
                    </select>
                )
            })}
        </div>
    );
}
