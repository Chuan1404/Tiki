import Stars from 'components/Stars';
import React from 'react'
import './style.scss';

export default function ProductCard({ thumbnail_url, name, price, discount, stars }) {
  return (
    <div className='productCard'>
      <div className="productCard_img">
        <img src={thumbnail_url} alt="" />
      </div>
      <p>{name}</p>
      <div className='product_stars'>
        <Stars number = {stars}/>
      </div>
      <div className='productCard_price'>
        <p>{price}</p>
        <div className='discount_box'>
          {discount}
        </div>
      </div>

    </div>
  )
}
