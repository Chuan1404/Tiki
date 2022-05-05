import { Search } from 'components';
import React from 'react'
import { useSelector } from 'react-redux';
import AddressPopup from './components/AddressPopup';
import LoginPopup from './components/LoginPopup';
import './style.scss';

export default function Popup() {
    const login = useSelector(store => store.page.popup.login)
    const address = useSelector(store => store.page.popup.address)
    const search = useSelector(store => store.page.popup.search)
    const isShow = login || address || search
    return (
        <div className={`popup ${isShow && 'show'}` }>
            {address && <AddressPopup />}
            {login && <LoginPopup />}
        </div>
    )
}
