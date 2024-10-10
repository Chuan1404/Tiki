import Inputs from 'components/Inputs';
import { useForm } from 'hooks';
import { useDispatch } from 'react-redux';

export default function EmailForm({ setActive }) {
    const dispatch = useDispatch();
    const { form, register } = useForm({
        email: '',
        password: '',
        role: 'admin'
    })
    const submit = () => {
        dispatch({
            type: 'LOGIN',
            payload: form
        })
    }
    return (
        <div className='emailForm'>
            <div className="emailForm_content">
                <h3>Đăng nhập bằng email</h3>
                <p>Nhập email và mật khẩu tài khoản Tiki</p>
            </div>
            <div className='emailForm_form'>
                <Inputs
                    type='email'
                    placeholder='acb@email.com'
                    {...register('email')} />
                <Inputs
                    type='password'
                    placeholder='Mật khẩu'
                    {...register('password')} />
            </div>
            <div className="form_submit">
                <button onClick={submit}>Đăng nhập</button>
            </div>
        </div>
    )
}
