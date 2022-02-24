import { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Ranks.module.scss";
import { flags } from "../../../../common/flags.js";

function Ranks() {
    const [data, setData] = useState();
    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND}/ranks/highscore`
            );
            if (response.data.message === "success")
                setData(response.data.payload);
        })();
    }, []);
    return (
        <>
          <div className={classes.list}>
          {data &&
            data.map((elem, i) => {
              return (
                <div key={i} className={classes.rank}>
                  <h3>{i + 1}</h3>
                      <img
                        className={classes.image}
                        src={elem.img}
                        alt={elem.username}
                      />
                      <p className={classes.name}>
                        {elem.username}
                      </p>
                      <img
                        className={classes.flag}
                        src={flags[elem.nat].url.small}
                        alt="flag"
                      />
                      <p className={classes.value}>
                        {elem.value}
                      </p>
                </div>
              );
          })}
          </div>     
        </>
    );
}
export default Ranks;
