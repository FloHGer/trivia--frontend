import { useState, useEffect } from 'react';
import axios from 'axios';

import RankCard from './RankCard.jsx';


import classes from './Ranks.module.scss';


export default function Ranks() {


  return (
    <main className={classes.main}>
      <h1 className={'heading heading__1'}>{'RANKINGS'}</h1>
      <section className={classes.listContainer}>
        <RankCard 
          className={classes.scoreCard}
          type={'highscore'}
        />
        <RankCard 
          className={classes.scoreCard}
          type={'totalscore'}
        />
      </section>
    </main>
  );
}
