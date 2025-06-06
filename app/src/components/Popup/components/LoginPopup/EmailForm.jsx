import Inputs from 'components/Inputs';
import { useForm } from 'hooks';
import { useDispatch } from 'react-redux';
import { closeLogin } from 'store/slices/pageSlice';

export default function EmailForm({ setActive }) {
    const dispatch = useDispatch();
    const { form, register } = useForm({
        email: '',
        password: '',
        role: 'USER'
    })
    const submit = () => {
        dispatch({
            type: 'LOGIN',
            payload: form
        })
        dispatch(closeLogin())
    }
    return (
        <div className='emailForm'>
            {/* <div className="emailForm_back">
                <GrPrevious onClick={setActive} color='rgb(131, 131, 131)' />
            </div> */}
            <div className="emailForm_content">
                <h3>Login</h3>
                <p>Input your email and password</p>
            </div>
            <div className='emailForm_form'>
                <Inputs
                    type='email'
                    placeholder='Email'
                    {...register('email')} />
                <Inputs
                    type='password'
                    placeholder='Password'
                    {...register('password')} />
            </div>
            <div className="form_submit">
                <button onClick={submit}>Submit</button>
                <div>
                    <a href="">Forget passget</a> <br />
                    <span>Don't have account?</span><a onClick={setActive}>Register</a></div>
            </div>
        </div>
    )
}
