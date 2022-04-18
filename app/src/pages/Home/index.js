import { CategoryBar, MenuSide, Paginate, ProductAccordion, Skeleton } from 'components';
import "flickity/dist/flickity.css";
import { useQuery } from 'hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { productService } from 'Services';
import { queryObject, queryString } from 'utils';
import './style.scss';


export default function Home() {
    const { search } = useLocation();
    const searchObj = useSelector(store => store.url)
    const {
        data: products,
        fetching: productFetching } = useQuery(() => productService.getProduct(search), [search])
    const titleList = [
        { categories: 1789, title: 'Điện Thoại - Máy Tính Bảng' },
        { categories: 1882, title: 'Điện Tử' },
        { categories: 12744, title: 'Khóa Học' },
        { categories: 13352, title: 'Du Lịch' },
        { categories: 23810, title: 'Bếp' },
        { categories: 8594, title: 'Xe - Phụ Kiện' },
    ]
    const query = queryObject();
    if (!search) return <Navigate to={`/?${queryString(searchObj)}`} />
    return (
        <div id='home'>
            <CategoryBar list={titleList} />
            <div className='container home-container'>
                <div className='homeSide'>
                    <MenuSide />
                </div>
                <div className='homeSection'>
                    {!productFetching ?
                        query.name ? <p className='title'>Kết quả tìm kiếm cho `{query.name}`</p>
                            : titleList.map(item => {
                                return products.data && products.data[0]?.categories == item.categories && <h1 className='title'>{item.title}</h1>
                            }) :
                        <Skeleton className='title' width={200} height={30} />}

                    <div className='homeProduct'>
                        <ProductAccordion
                            data={products.data}
                            fetching={productFetching} />
                    </div>
                    <div className='homePaginate'>
                        <Paginate totalPage={products.paginate?.totalPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}
