import React from 'react'
import './style.scss';
import { v4 as uuidv4 } from 'uuid';

export default function Inputs({ placeholder = 'Input text', type = 'text', children, border, ...register }) {
  const id = uuidv4()
  return (
    <div className='inputs'>
      <input
        id={id}
        type={type}
        className={border && 'border'}
        placeholder={placeholder} 
        {...register}></input>
      {children && <label for={id}>{children}</label>}
    </div>
  )
}
