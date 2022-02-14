
import Progress from './Progress';

import classes from './Spinner.module.scss';


export default function Spinner({isLoading}) {
  return (
    <div className={classes.spinnerContainer}>
      <h1>{'LOADING...'}</h1>
      <h2>{`${30 - isLoading}/30 Questions loaded!`}</h2>
      <Progress max={30} value={30 - isLoading} height={'3rem'} />
    </div>
  );
}
