import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import './style.scss';

export default function CountControl({ value, setValue }) {
  const handleValue = (number) => {
    number > 0 && setValue(number)
  }
  return (
    <div className='countControl'>
      <div
        className={`box minus ${value == 1 && 'opacity'}`}
        onClick={() => handleValue(value - 1)}>
        <AiOutlineMinus />
      </div>
      <div className="box">{value}</div>
      <div className="box plus" onClick={() => handleValue(value + 1)}>
        <AiOutlinePlus />
      </div>
    </div>
  )
}
