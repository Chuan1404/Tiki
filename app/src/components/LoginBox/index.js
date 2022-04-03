import React, { useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { close } from 'store/slices/loginPopupSlice';
import EmailForm from './component/EmailForm';
import NumberForm from './component/NumberForm';
import './style.scss';



export default function LoginBox() {
    let [formStyle, setFormStyle] = useState(true);
    const { isOpen } = useSelector(store => store.loginPopup)
    const dispatch = useDispatch()
    const changeForm = (e) => {
        e.preventDefault();
        setFormStyle(!formStyle);
    }

    const closePopup = () => {
        dispatch(close());
    }
    return (
        <div className={`loginBox ${isOpen && 'active'}`}>
            <div className="loginBox_popup">
                <div className="loginBox_left">
                    {formStyle && <NumberForm
                        setActive={changeForm} />}
                    {!formStyle && <EmailForm
                        setActive={changeForm} />}
                </div>
                <div className="loginBox_right">
                    <img src="imgs/login.png" alt="" />
                    <div className="content">
                        <p>Mua sắm tại Tiki</p>
                        <p>Siêu ưu đãi mỗi ngày</p>
                    </div>
                </div>
                <div className="loginBox_close"
                    onClick={closePopup}>
                    <GrFormClose />
                </div>
            </div>
        </div>
    )
}
