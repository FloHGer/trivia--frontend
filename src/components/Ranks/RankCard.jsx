import { useState, useEffect } from 'react';
import axios from 'axios';

import {flags} from '../../common/flags.js';
import classes from './RankCard.module.scss';


export default function RankCard({type}) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    (async() => {
      try{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/ranks/${type}`);
        if(response) {
          setRanking(response.data.payload.slice(0, 5));
        }
      }catch(err){console.log(err)}
    })();
  }, [type]);


  return (
    <div className={classes.rankCard}>
      <div className={classes.list}>
      <h2 className={'heading heading__2'}>{type.toUpperCase()}</h2>
        {ranking.map((rank, i) => (
          <div key={i} className={classes.rank}>
            <h3>{i + 1}</h3>
            <img className={classes.image} src={rank.img} alt={rank.username} />
            <p className={classes.name}>{rank.username}</p>
            <img className={classes.flag} src={flags[rank.nat].url.small} alt='flag' />
            <p className={classes.value}>{rank.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
