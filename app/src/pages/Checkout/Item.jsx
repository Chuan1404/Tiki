import { CountControl, Inputs } from 'components'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function Item({ id, name, realPrice, price, img, quantity, onChange, isCheck, ...res }) {
    const [quan, setQuan] = useState(quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'UPDATE_CART',
            payload: {
                id: id,
                quantity: quan
            }
        })
    }, [quan])
    const handleRemove = () => {
        dispatch({
            type: 'REMOVE_CART',
            payload: id
        })
    }
    return (
        <div className={`item`} {...res} id={id}>
            <div className='item_product col_1'>
                <Inputs type='checkbox' checked={isCheck} onChange={onChange(id)} />
                <div className="img"><img src={img} alt="" /></div>
                <div className='name'>{name}</div>
            </div>
            <div className='item_price col_2'>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(realPrice)}</span>
                {price && <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</span>}
            </div>
            <div className='item_quantity col_3'>
                <CountControl value={quan} setValue={setQuan} />
            </div>
            <div className='item_sum col_4'>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(quan * realPrice)}</span>
            </div>
            <div className='item_trash col_5' onClick={handleRemove}>
                <img src="/imgs/trash.svg" alt="" />
            </div>
        </div>
    )
}
