
import Button from './Button';

import classes from './FeedbackCard.module.scss';


export default function FeedbackCard({title, text, achievs = [], onClick}) {


  return (
    <div
    className={classes.card}
    style={{
      height: achievs.length ? `${30 + (achievs.length -1) * 10}%` : '30%',
    }}
    >
      <h3 className={'heading heading__2'}>{title}</h3>
      {text && <p>{text}</p>}
      {achievs.map(achiev => (
        <>
          <h4 className={'heading heading__4'}>NEW Achievement unlocked:</h4>
          <p>{achiev}</p>
        </>
      ))}
        <Button
          title={'OK'}
          onClick={onClick}
          maxWidth={'12rem'}
          maxHeight={'5rem'}
        />
    </div>
  )
}
