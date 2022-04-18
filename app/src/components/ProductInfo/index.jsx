import { CountControl } from 'components';
import Buttons from 'components/Buttons';
import Stars from 'components/Stars';
import React from 'react'
import './style.scss';

export default function ProductInfo({ product = {} }) {
  const format = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number)
  }
  return (
    <div className='productInfo'>
      <div className="productInfo_header">
        <span className='branch'>
          Thương hiệu: {product.brand_name == undefined ? product.brand_name : 'No branch'}
        </span>
        <h1 className='name'>
          {product.name}
        </h1>
        <div className='star'>
          <Stars number={product.rating_average} />
          <span style={{ color: 'rgb(120, 120, 120)' }}>
            ({product.review_count} lượt đánh giá)
          </span>
        </div>
      </div>
      <div className="productInfo_price">
        <span className='price'>{format(product.real_price)}</span>
        <span className='real_price'>{format(product.price)}</span>
        <div className='discount_box'>-{product.discount_rate}%</div>
      </div>
      <div className='productInfo_options'>
        <div className="option address">
          <span className='option_name'>Vận Chuyển</span>
          <div className='option_content'>
            <p>Q.1,P.Bến Nghé,Hồ Chí Minh</p>
            <a href="">Đổi địa chỉ</a>
          </div>
        </div>
        {product.configurable_options?.map(item =>
          <div className="option">
            <span className='option_name'>{item.name}</span>
            <div className='option_content'>
              {item.values?.map(value =>
                <div className='boxValue'>{value.label}</div>
              )}
            </div>
          </div>)}
        <div className="option quantity">
          <span className='option_name'>Số lượng</span>
          <div className='option_content'>
            <CountControl />
          </div>
        </div>
      </div>
      <div className='productInfo_btn'>
        <Buttons
          bgcolor='red'
          size='large'
          radius>Chọn Mua</Buttons>
      </div>
    </div>
  )
}
