import { Skeleton } from 'components';
import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import { useQuery } from 'hooks';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { productService } from 'Services';
import { closeSearchBox, openSearchBox } from 'store/slices/pageSlice';
import { queryObject, queryString } from 'utils';
import './style.scss';

export default function Search() {
    const [keys, setKeys] = useState('')
    const [typing, setTyping] = useState(true)
    const dispatch = useDispatch()
    const { search, pathname } = useLocation()
    const isShow = useSelector(store => store.page.searchBox)
    const query = queryObject();
    const navigator = useNavigate()

    let id;

    const {
        data: result,
        fetching: fetchingResult }
        = useQuery(() => productService.getProduct(`${search}&${queryString({ name: keys })}`), [typing])

    const inputChange = (e) => {
        clearTimeout(id)
        id = setTimeout(() => { setTyping(!typing) }, 1000)
        setKeys(e.target.value)
    }
    const inputFocus = (e) => {
        dispatch(openSearchBox());
    }
    const inputBlur = (e) => {
        dispatch(closeSearchBox())
    }
    const handleClick = (e) => {
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
                {isShow && <div className="search_input-box">
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
                                    <div className='img'><img src={product.thumbnail_url}></img></div>
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
