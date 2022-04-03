import Paginate from 'components/Paginate';
import ProductCard from 'components/ProductCard';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { productService } from 'Services';
import './style.scss';

export default function ProductAccordion() {
    const [fetching, setFetching] = useState(true);
    const [product, setProduct] = useState({});
    const { search } = useLocation()
    useEffect(() => {
        (async () => {
            const data = await productService.getProduct(search);
            setFetching(false)
            setProduct(data)
        })()
    }, [product])
    if (fetching) return <h1>Loading prduct...</h1>
    return (
        <div className='productAccordion'>
            <ul className="product_tab">
                <li className='active'><a href="">Phổ Biến</a></li>
                <li><a href="">Bán Chạy</a></li>
                <li><a href="">Hàng Mới</a></li>
                <li><a href="">Giá Thấp</a></li>
                <li><a href="">Giá Cao</a></li>
            </ul>
            <ul className='product_list'>
                {product.data?.map(item => (
                    <li key={item._id} className='product_list-item'>
                        <ProductCard
                            thumbnail_url={item.images[0].thumbnail_url}
                            name={item.name}
                            price={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                            discount={'-' + item.discount_rate + '%'}
                            stars={item.rating_average} />
                    </li>
                ))}
            </ul>
            <div className='product_paginate'>
                <Paginate totalPage={product.paginate?.totalPage} />
            </div>
        </div>
    )
}
