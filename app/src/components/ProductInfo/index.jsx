import { CountControl } from 'components';
import Buttons from 'components/Buttons';
import Stars from 'components/Stars';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openAddress } from 'store/slices/pageSlice';
import './style.scss';

export default function ProductInfo({ product = {} }) {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const { user, isLogin } = useSelector(store => store.auth);
  const { city, district, ward } = useSelector(store => store.address)

  const format = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
  }
  const handleBuy = () => {
    window.scrollTo(0,0);
    if(isLogin) {
      dispatch({
        type: 'ADD_CART',
        payload: {
          productId: product.id,
          quantity,
        }
      })
    }
    else {
      alert("You need to sign in first")
    }
    
  }

  const handleClick = index => e => {
    let options = document.querySelectorAll(`.option.gr-${index} .boxValue`)
    options.forEach(item => item.classList.remove('active'))
    e.target.classList.add('active')
  }
  
  const changeAddress = e => {
    e.preventDefault();
    dispatch(openAddress())
  }
  return (
    <div className='productInfo'>
      <div className="productInfo_header">
        <span className='branch'>
          Brand: {product.brand_name ? product.brand_name : 'No branch'}
        </span>
        <h1 className='name'>
          {product.name}
        </h1>
        <div className='star'>
          <Stars number={product.rating_average} />
          <span style={{ color: 'rgb(120, 120, 120)' }}>
            ({product.review_count || 0} review)
          </span>
        </div>
      </div>
      <div className="productInfo_price">
        <span className='price'>{format(product.price)}</span>
        <span className='real_price'>{format(product.price)}</span>
        <div className='discount_box'>-{product.discount_rate || 0}%</div>
      </div>
      <div className='productInfo_options'>
        <div className="option address">
          <span className='option_name'>Delivery</span>
          <div className='option_content'>
            <p>{`${ward}, ${district}, ${city}`}</p>
            <a href="" onClick={changeAddress}>Change address</a>
          </div>
        </div>

        {product.configurable_options?.map((item, index) =>
          <div className={`option gr-${index}`}>
            <span className='option_name'>{item.name}</span>
            <div className='option_content'>
              {item.values?.map(value =>
                <div
                  className='boxValue'
                  onClick={handleClick(index)}>{value.label}</div>
              )}
            </div>
          </div>)}

        <div className="option quantity">
          <span className='option_name'>Quantity</span>
          <div className='option_content'>
            <CountControl value={quantity} setValue={setQuantity} />
          </div>
        </div>
      </div>
      <div className='productInfo_btn'>
        <Buttons
          bgcolor='red'
          size='large'
          radius
          onClick={handleBuy}>Add to cart</Buttons>
      </div>
    </div>
  )
}
