import { SliderProduct } from 'components'
import { useQuery } from 'hooks'
import React from 'react'
import { productService } from 'Services'
import './style.scss'

export default function ProductDetail() {
  const {
    data,
    fetching } = useQuery(() => productService.getProduct())
  if (!fetching) data.data?.forEach((item, index) => console.log(index, item.slug))
  return (
    <div className='productDetail'>
      <div className='container'>
        <div className="product">
          <div className="product_img">
            <SliderProduct />
          </div>
          <div className="product_info"></div>
        </div>
      </div>
    </div>
  )
}
