import React from 'react'
import './style.scss';

export default function Inputs({ placeholder = 'Input text', type='text', children, ...register }) {
  return (
    <div className='inputs'>
      <input type={type} placeholder={placeholder} {...register}></input>
      {children && <label>{children}</label>}
    </div>
  )
}
