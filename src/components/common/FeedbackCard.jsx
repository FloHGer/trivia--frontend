import { Link, useNavigate } from 'react-router-dom';

import Button from './Button';

import classes from './FeedbackCard.module.scss';


export default function FeedbackCard({title, text, link, achievs, width, height}) {
  const navigate = useNavigate();


  return (
    <div
    className={classes.card}
    style={{
      width: width || '',
      height: height || '',
    }}
    >
      <h3 className={'heading heading__2'}>{title}</h3>
      {text && <p>{text}</p>}
      {achievs && achievs.map(achiev => (
        <>
          <h4 className={'heading heading__4'}>NEW Achievement unlocked:</h4>
          <p>{achiev}</p>
        </>
      ))}
        <Button
          title={'OK'}
          onClick={() => navigate(link)}
          maxWidth={'12rem'}
          maxHeight={'5rem'}
        />
    </div>
  )
}
