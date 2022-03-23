import Buttons from 'components/Buttons';
import Inputs from 'components/Inputs';
import React from 'react';
import './style.scss';

export default function Header() {
    return (
        <header className='header'>
            <div className="container header-container">
                <div className="logo">
                    <a href=""><img src="imgs/logo.png" alt="" /></a>
                </div>
                <div className="search">
                    <div className="search_input">
                        <Inputs placeholder='Tìm sản phẩm, danh mục hay thương hiệu mong muốn ...'/>
                        <Buttons color='bold' radius>Tìm Kiếm</Buttons>
                    </div>
                    <div className="search_box">

                    </div>
                </div>
                <div className="users">
                    <div className="users_item">
                        <img src="imgs/user.png" alt="" />
                        <span>Đăng nhập</span>
                    </div>
                    <div className="users_item">
                        <img src="imgs/cart.png" alt="" />
                        <span>Giỏ Hàng</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
