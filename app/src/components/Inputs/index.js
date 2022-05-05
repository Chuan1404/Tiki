import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './style.scss';

export default function Inputs({ placeholder = 'Input text', type = 'text', children, border, ...register }) {
  const id = uuidv4()
  return (
    <div className='inputs'>
      <input
        id={id}
        type={type}
        className={border && 'border'}
        placeholder={placeholder}
        {...register} />
      {children && <label htmlFor={id}>{children}</label>}
    </div>
  )
}
