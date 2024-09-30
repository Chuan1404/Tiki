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

  const { city, district, ward } = useSelector(store => store.address)

  const format = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
  }
  const handleBuy = () => {
    window.scrollTo(0,0);
    dispatch({
      type: 'UPDATE_CART',
      payload: {
        id: product._id,
        quantity
      }
    })
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
          Thương hiệu: {product.brand_name ? product.brand_name : 'No branch'}
        </span>
        <h1 className='name'>
          {product.name}
        </h1>
        <div className='star'>
          <Stars number={product.rating_average} />
          <span style={{ color: 'rgb(120, 120, 120)' }}>
            ({product.review_count || 0} lượt đánh giá)
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
          <span className='option_name'>Vận Chuyển</span>
          <div className='option_content'>
            <p>{`${ward}, ${district}, ${city}`}</p>
            <a href="" onClick={changeAddress}>Đổi địa chỉ</a>
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
          <span className='option_name'>Số lượng</span>
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
          onClick={handleBuy}>Chọn Mua</Buttons>
      </div>
    </div>
  )
}
