import { useState, useEffect } from 'react';
import axios from 'axios';

import {flags} from '../common/flags.js';
import classes from './Ranks.module.scss';


export default function Ranks() {
  const [highScore, setHighScore] =useState([]);
  const [totalScore, setTotalScore] =useState([]);


  useEffect(() => {
    (async() => {
      try{
        const highScoreResponse = await axios.get(`${process.env.REACT_APP_BACKEND}/ranks/highscore`);
        if(highScoreResponse) setHighScore(highScoreResponse.data.payload);
        const totalScoreResponse = await axios.get(`${process.env.REACT_APP_BACKEND}/ranks/totalscore`);
        if(totalScoreResponse) setTotalScore(totalScoreResponse.data.payload);
      }catch(err){console.log(err)}
    })();
  }, []);
  



  return (
    <main className={classes.main}>
      <h1 className={'heading heading__1'}>{'RANKINGS'}</h1>
      <section className={classes.listContainer}>
        <div className={classes.highScore}>
          <h2 className={'heading heading__2'}>{'HIGHSCORE'}</h2>
          <div className={classes.highScore__list}>
            {highScore.map((rank, i) => (
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
      </section>
    </main>
  );
}
