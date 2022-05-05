import { Skeleton } from 'components';
import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import { useQuery } from 'hooks';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { productService } from 'Services';
import { queryObject, queryString } from 'utils';
import './style.scss';

export default function Search({ isFocus, setIsFocus }) {
    const [keys, setKeys] = useState('')
    const [typing, setTyping] = useState(true)
    const { search, pathname } = useLocation()
    const query = queryObject();
    const navigator = useNavigate()


    const {
        data: result,
        fetching: fetchingResult }
        = useQuery(() => productService.getProduct(`?${search}&${queryString({ name: keys })}`), [typing])

    const inputChange = (e) => {
        setKeys(e.target.value)
    }
    const inputFocus = (e) => {
        setIsFocus(true)
    }
    const inputBlur = (e) => {
        setIsFocus(false)
    }
    const handleClick = (e) => {
        delete query.categories;
        query.name = keys;
        let url = `${pathname}?${queryString(query)}`
        navigator(url)
    }
    return (
        <div className='search'>
            <div className="search_input">
                <Inputs
                    value={keys}
                    placeholder='Tìm sản phẩm, danh mục hay thương hiệu mong muốn ...'
                    onChange={inputChange}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />
                {isFocus && <div className="search_input-box">
                    {fetchingResult ?
                        [...Array(10)].map((e, i) =>
                            <li>
                                <a href="">
                                    <Skeleton width={'100%'} height={20} />
                                </a>
                            </li>) :
                        result.data?.map(product => {
                            return <li>
                                <a href="">
                                    <div className='img'><img src={product.thumbnail_url} /></div>
                                    <span className='name'>{product.name}</span>
                                </a>
                            </li>
                        })
                    }

                </div>}
            </div>
            <Buttons onClick={handleClick} bgcolor='bold'>Tìm Kiếm</Buttons>
        </div>
    )
}
