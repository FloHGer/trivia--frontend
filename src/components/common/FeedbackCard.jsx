import { Link, useNavigate } from 'react-router-dom';

import Button from './Button';

import classes from './FeedbackCard.module.scss';


export default function FeedbackCard({title, text, link}) {
  const navigate = useNavigate();


  return (
    <div className={classes.card}>
      <h3 className={'heading heading__2'}>{title}</h3>
      {text && <p>{text}</p>}
        <Button
          title={'OK'}
          onClick={() => navigate(link)}
          maxWidth={'12rem'}
          maxHeight={'5rem'}
        />
    </div>
  )
}
