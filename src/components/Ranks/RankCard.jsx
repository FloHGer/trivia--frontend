import { useState, useEffect } from 'react';
import axios from 'axios';

import {flags} from '../../common/flags.js';
import classes from './RankCard.module.scss';


export default function RankCard({className, type}) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    (async() => {
      try{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ranks/${type}`);
        if(response) setRanking(response.data.payload);
      }catch(err){console.log(err)}
    })();
  }, [type]);


  return (
    <div className={className}>
          <h2 className={'heading heading__2'}>{type.toUpperCase()}</h2>
          <div className={classes.list}>
            {ranking.map((rank, i) => (
              <div className={classes.rank}>
                <h3>{i + 1}</h3>
                <img className={classes.image} src={rank.img} alt={rank.username} />
                <img className={classes.flag} src={flags[rank.nat].url.small} alt='flag' />
                <p className={classes.name}>{rank.username}</p>
                <p className={classes.value}>{rank.value}</p>
              </div>
            ))}
          </div>
        </div>
  )
}
