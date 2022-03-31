import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

export default function Stars({ number }) {
  if(number == 0) return <></>

  const fill = Math.trunc(number)
  const half = Math.ceil(number - fill);

  const fillStars = [];
  const halfStars = [];
  const stars = []

  for (let i = 1; i <= fill; i++)
    fillStars.push(<BsStarFill color='rgb(253, 216, 54)'/>)
  for (let i = 1; i <= half; i++)
    halfStars.push(<BsStarHalf color='rgb(253, 216, 54)'/>)
  for (let i = 1; i <= (5 - fill - half); i++)
    stars.push(<BsStar />)
  return (
    <div className='stars'>
      {fillStars.map(item => item)}
      {halfStars.map(item => item)}
      {stars.map(item => item)}
    </div>
  )
}
