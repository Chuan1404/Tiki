import { ClosePopUp } from 'components';
import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddress } from 'store/slices/pageSlice';
import './style.scss';
import UpdateBox from './UpdateBox';

export default function AddressPopup() {
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [address, setAddress] = useState({
        city: '',
        district: '',
        ward: ''
    })
    const dispatch = useDispatch()
    const { city, district, ward } = useSelector(store => store.address)
    const handleSubmit = () => {
        dispatch({
            type: 'UPDATE_ADDRESS',
            payload: address
        })
    }


    useEffect(() => {
        (async () => {
            setFetching(false)
            let data = await fetch(`https://provinces.open-api.vn/api/?depth=3`, {
                'Content-Type': 'application/json'
            }).then(res => res.json())
            setData(data);
            setFetching(true)
        })()
    }, [])
    const handleClose = () => {
        dispatch(closeAddress())
    }
    const changeValue = (e) => {
        setIsUpdate(e.target.value)
    }
    return (
        <div className='addressBox'>
            <div className="addressBox_form">
                <p>Địa chỉ giao hàng</p>
                <div className="addressBox_select">
                    <span>Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận chuyển một cách chính xác nhất.</span>
                    <Inputs name='address'
                        type='radio'
                        onChange={changeValue}
                        value={false}>{`${ward}, ${district}, ${city}`}</Inputs>
                    <Inputs name='address'
                        type='radio'
                        onChange={changeValue}
                        value={true}>Chọn Khu Vực</Inputs>
                </div>
                {isUpdate == 'true' && <div className="addressBox_update">
                    <UpdateBox descreption='Tỉnh/Thành phố'
                        type='city'
                        data={data}
                        address={address}
                        setAddress={setAddress}
                    />
                    <UpdateBox descreption='Quận/Huyện'
                        type='district'
                        data={data}
                        address={address}
                        setAddress={setAddress}
                        disable={!address.city}
                    />
                    <UpdateBox descreption='Phường/Xã'
                        type='ward'
                        data={data}
                        address={address}
                        setAddress={setAddress}
                        disable={!address.district}
                    />
                </div>}
            </div>
            <div className="btn">
                <Buttons bgcolor='red'
                    radius
                    size='large'
                    onClick={handleSubmit}
                >GiAO ĐẾN ĐỊA CHỈ NÀY
                </Buttons>
            </div>
            <div className="close" onClick={handleClose}>
                <ClosePopUp />
            </div>
        </div>
    )
}
