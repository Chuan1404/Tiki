import { Skeleton } from 'components';
import ProductCard from 'components/ProductCard';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { queryObject, queryString } from 'utils';
import './style.scss';

export default function ProductAccordion({ data = [], fetching = false }) {
    const { pathname, search } = useLocation();
    const query = queryObject();
    const [isActive, setIsActive] = useState(0);
    const navigator = useNavigate()

    let activeIndex = 0;
    useEffect(() => {
        if (search.indexOf('sort=price.asc') > -1) activeIndex = 1
        else if (search.indexOf('sort=price.desc') > -1) activeIndex = 2
        else activeIndex = 0
        setIsActive(activeIndex)
    }, [search])

    const list = [
        { sort: 'default', title: 'Popular' },
        { sort: 'price.asc', title: 'Low price' },
        { sort: 'price.desc', title: 'High price' }
    ]
    return (
        <div className='productAccordion'>
            <ul className="product_tab">
                {!fetching ?
                    list.map((item, i) =>
                        <li
                            key={i}
                            className={(isActive == i) ? 'active' : ''}
                            onClick={() => setIsActive(i)}>
                            <Link to={`${pathname}?${queryString({ ...query, sort: item.sort, page: 1 })}`}>{item.title}</Link>
                        </li>) :
                    [...Array(3)].map((e, i) =>
                        <li key={i} style={{ marginLeft: i == 0 ? 15 : 0 }}>
                            <Skeleton width={80} height={20} />
                        </li>)
                }
            </ul>
            <ul className='product_list'>
                {fetching ?
                    [...Array(12)].map((e, i) =>
                        <li key={i} className='product_list-item'>
                            <ProductCard loading={true} />
                        </li>) :
                    data.map(item => (
                        <li key={item.id}
                            className='product_list-item'>
                            <ProductCard
                                slug={item.slug}
                                thumbnail_url={item.thumbnailUrl}
                                name={item.name}
                                // price={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.real_price)}
                                price={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                // discount={'-' + item.discount_rate + '%'}
                                stars={item.rating_average} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
