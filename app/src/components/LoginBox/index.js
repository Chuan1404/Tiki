import React, { useState } from 'react';
import EmailForm from './component/EmailForm';
import NumberForm from './component/NumberForm';
import './style.scss';

export default function LoginBox() {
    let [formStyle, setFormStyle] = useState(true);
    return (
        <div className='loginBox'>
            <div className="loginBox_popup">
                <div className="loginBox_left">
                    {formStyle && <NumberForm />}
                    {!formStyle && <EmailForm />}
                </div>
                <div className="loginBox_right">
                    <img src="imgs/login.png" alt="" />
                    <div className="content">
                        <p>Mua sắm tại Tiki</p>
                        <p>Siêu ưu đãi mỗi ngày</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
