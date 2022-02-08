import { useState } from 'react';
import axios from 'axios';

import Card from './common/Card';
import Button from './common/Button';

import classes from "./Feedback.module.scss";


export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const ratingData = [1, 2, 3, 4, 5];

  const submitHandler = async e => {
    e.preventDefault();
    const response = axios.post(`${process.env.REACT_APP_BACKEND}/feedback`,
      {value: rating, message}
    );
    // if(response.data.message === 'success') ;
  }


  return (
    <main className={classes.main}>
      <h1 className={'heading heading__1'}>{'Feedback'}</h1>
      <Card maxWidth={'40%'}>
        <form onSubmit={e => submitHandler(e)}>
          <div className={classes.ratingContainer}>
            {ratingData.map((rating, i) => (
              <label key={i} >
                {i + 1}
                <input type='radio' name={'rating'} value={i + 1} onChange={e => setRating(e.target)} />
              </label>
            ))}
          </div>
          <textarea onChange={e => setMessage(e.target.value)} />
          <Button
            type={'submit'}
            title={'submit'}
            maxWidth={'20%'}
            maxHeight={'5rem'}
            fontSize={'2rem'}
          />
        </form>
      </Card>
    </main>
  );
}
