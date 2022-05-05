import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import Stars from 'components/Stars';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { openAddress } from 'store/slices/pageSlice';
import { queryObject, queryString } from 'utils';
import './style.scss';

export default function MenuSide() {
    const { pathname } = useLocation()
    const navigater = useNavigate()
    const dispatch = useDispatch()
    const [minValue, setMinValue] = useState()
    const [maxValue, setMaxValue] = useState()
    const address = useSelector(store => store.address);
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(openAddress());
    }


    const style = {
        display: 'inline-block',
        marginRight: 10,
        marginBottom: 10,
    }
    const query = queryObject();

    const filterByRating = (number) => {
        query.rating_average = number
        let url = `${pathname}?${queryString({ ...query, page: 1 })}`
        navigater(url)
    }
    const filterByPrice = () => {
        query.minPrice = minValue;
        query.maxPrice = maxValue;
        let url = `${pathname}?${queryString({ ...query, page: 1 })}`
        navigater(url)
    }
    return (
        <div className='menuSide'>
            <div className="menuSide_item">
                <h3>Địa chỉ nhận hàng</h3>
                <p>{`${address.ward},${address.district},${address.city}`}</p>
                <a href=''
                    style={{ textTransform: 'uppercase' }}
                    onClick={handleClick}>
                    Đổi địa chỉ
                </a>
            </div>
            <div className="menuSide_item">
                <h3>Đánh giá</h3>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => filterByRating(5)}><Stars number={5}
                        style={style} />từ 5 sao</div>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => filterByRating(4)}><Stars number={4}
                        style={style} />từ 4 sao</div>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => filterByRating(3)}><Stars number={3}
                        style={style} />từ 3 sao</div>

            </div>
            <div className="menuSide_item">
                <h3>Giá</h3>
                <span>Chọn khoảng giá</span>
                <div className='cost_range'>
                    <Inputs
                        border
                        value={minValue}
                        placeholder='0'
                        onChange={(e => setMinValue(e.target.value))} />
                    <div className='to'></div>
                    <Inputs
                        border
                        value={maxValue}
                        placeholder='0'
                        onChange={(e => setMaxValue(e.target.value))} />
                </div>
                <Buttons onClick={filterByPrice} border color='main' radius>Áp dụng</Buttons>
            </div>
        </div>
    )
}
