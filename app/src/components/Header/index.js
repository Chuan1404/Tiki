import { Search } from 'components';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { openLoginPopup } from 'store/slices/pageSlice';
import './style.scss';

export default function Header() {
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth);
    const isActive = useSelector(store => store.page.searchBox)
    const openPopup = () => {
        dispatch(openLoginPopup())
    }
    const openCart = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!token) openPopup()
    }
    return (
        <header className={`header ${isActive && 'active'}`}>
            <div className="container header-container">
                <div className="logo">
                    <a href=""><img src="imgs/logo.png" alt="" /></a>
                </div>
                <div className="header_search">
                    <Search />
                </div>
                <div className="users">
                    <div className="users_item" onClick={openPopup}>
                        <img src="imgs/user.png" alt="" />
                        <span>{user.data?.name}</span>
                    </div>
                    <div className="users_item" onClick={openCart}>
                        <img src="imgs/cart.png" alt="" />
                        <span>Giỏ Hàng</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
