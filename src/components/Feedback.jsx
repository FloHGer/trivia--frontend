import { useState } from 'react';
import axios from 'axios';

import Card from './common/Card';
import Button from './common/Button';


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
    <main>
      <h1>{'Feedback'}</h1>
      <Card>
        <form onSubmit={e => submitHandler(e)}>
          {ratingData.map((rating, i) => (
            <label key={i} >
              <p>{i + 1}</p>
              <input type='radio' name={'rating'} value={i + 1} onChange={e => setRating(e.target)} />
            </label>
          ))}
          <textarea onChange={e => setMessage(e.target.value)} />
          <input type='submit' value={'submit'} />
        </form>
      </Card>
    </main>
  );
}
