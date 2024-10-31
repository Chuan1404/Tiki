import { ClosePopUp } from 'components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLogin } from 'store/slices/pageSlice';
import EmailForm from './EmailForm';
import RegisterForm from './RegisterForm';
import './style.scss';



export default function LoginPopup() {
    const [formStyle, setFormStyle] = useState(true);
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
                {formStyle && <EmailForm
                    setActive={changeForm} />}
                {!formStyle && <RegisterForm
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
