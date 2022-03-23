import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import React from 'react'
import './style.scss';

export default function MenuSide() {
    return (
        <div className='menuSide'>
            <div className="menuSide_item">
                <h3>Địa chỉ nhận hàng</h3>
                <p>Q.1,P.Bến Nghé,Hồ Chí Minh</p>
                <a style={{textTransform: 'uppercase'}} href=''>Đổi địa chỉ</a>
            </div>

            <div className="menuSide_item">
                <h3>Dịch vụ</h3>
                <Inputs type='checkbox'>Giao siêu tốc 2h</Inputs>
                <Inputs type='checkbox'>Không giới hạn</Inputs>
                <Inputs type='checkbox'>Rẻ hơn hoàn tiền</Inputs>
            </div>
            <div className="menuSide_item">
                <h3>Nơi Bán</h3>
                <Inputs type='checkbox'>Hồ Chí Minh</Inputs>
                <Inputs type='checkbox'>Hà Nội</Inputs>
                <Inputs type='checkbox'>Ninh Bình</Inputs>
                <Inputs type='checkbox'>Đà Nẵng</Inputs>
                <Inputs type='checkbox'>Đắk LắK</Inputs>
                <a href=''>Xem thêm</a>
            </div>
            <div className="menuSide_item">
                <h3>Đánh giá</h3>
                
                <a href=''>Xem thêm</a>
            </div>
            <div className="menuSide_item">
                <h3>Giá</h3>
                
                <Buttons border>Áp dụng</Buttons>
            </div>
        </div>
    )
}
