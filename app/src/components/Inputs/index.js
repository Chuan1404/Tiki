import React from 'react'
import './style.scss';

export default function Inputs({ placeholder = 'Input text', type='text', children }) {
  return (
    <div className='inputs'>
      <input type={type} placeholder={placeholder}></input>
      {children && <label>{children}</label>}
    </div>
  )
}
