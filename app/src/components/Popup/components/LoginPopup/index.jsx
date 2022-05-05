import { ClosePopUp } from 'components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLogin } from 'store/slices/pageSlice';
import EmailForm from './EmailForm';
import NumberForm from './NumberForm';
import './style.scss';



export default function LoginPopup() {
    let [formStyle, setFormStyle] = useState(true);
    const dispatch = useDispatch()

    const changeForm = (e) => {
        e.preventDefault();
        setFormStyle(!formStyle);
    }
    const closePopup = () => {
        dispatch(closeLogin());
    }
    return (
        <div className='loginPopup'>
            <div className="loginPopup_left">
                {formStyle && <NumberForm
                    setActive={changeForm} />}
                {!formStyle && <EmailForm
                    setActive={changeForm} />}
            </div>
            <div className="loginPopup_right">
                <img src="imgs/login.png" alt="" />
                <div className="content">
                    <p>Mua sắm tại Tiki</p>
                    <p>Siêu ưu đãi mỗi ngày</p>
                </div>
            </div>
            <div className="loginPopup_close popupClose"
                onClick={closePopup}>
                <ClosePopUp />
            </div>
        </div>
    )
}
