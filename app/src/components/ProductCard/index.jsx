import { Skeleton } from 'components';
import Stars from 'components/Stars';
import React from 'react'
import './style.scss';

export default function ProductCard({ thumbnail_url, name, price, discount, stars, loading }) {
  if (loading) return (
    <div className='productCard'>
      <div className="img">
        <Skeleton width={'100%'} height={'100%'} />
      </div>
      <Skeleton className='name' height={38} />
      <div className='price'>
        <Skeleton width={'50%'} height={24} />
      </div>
    </div>
  )
  return (
    <div className='productCard'>
      <div className="img">
        <img src={thumbnail_url} alt="" />
      </div>
      <p className='name'>{name}</p>
      <div className='stars'>
        <Stars number={stars} />
      </div>
      <div className='price'>
        <p>{price}</p>
        <div className='discount_box'>
          {discount}
        </div>
      </div>

    </div>
  )
}
