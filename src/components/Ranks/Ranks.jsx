
import RankCard from './RankCard.jsx';


import classes from './Ranks.module.scss';


export default function Ranks() {


  return (
    <main className={classes.main}>
      <h1 className={'heading heading__1'}>{'RANKINGS'}</h1>
      <section className={classes.listContainer}>
        <RankCard 
          type={'highscore'}
        />
        <RankCard 
          type={'totalscore'}
        />
      </section>
    </main>
  );
}
