import React from 'react'
import './style.scss';

export default function CountControl() {
  return (
    <div className='countControl'>
        <div className="box minus">-</div>
        <div className="box">1</div>
        <div className="box plus">+</div>
    </div>
  )
}
