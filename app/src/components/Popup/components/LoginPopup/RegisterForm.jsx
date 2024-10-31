import { Inputs } from 'components';
import { useForm } from 'hooks';
import { useDispatch } from 'react-redux';
import { closeLogin } from 'store/slices/pageSlice';

export default function RegisterForm({ setActive }) {
    const dispatch = useDispatch()
    const { form, register } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
    })

    const submit = () => {
        dispatch({
            type: 'REGISTER',
            payload: form
        })
        dispatch(closeLogin())
    }

    return (
        <div className='emailForm'>
            <div className="emailForm_content">
                <h3>Register</h3>
            </div>
            <div className='emailForm_form'>
                <Inputs
                    type='email'
                    placeholder='Email'
                    {...register('email')} />
                <Inputs
                    type='text'
                    placeholder='Name'
                    {...register('name')} />
                <Inputs
                    type='password'
                    placeholder='Password'
                    {...register('confirmPassword')} />
                <Inputs
                    type='password'
                    placeholder='Confirm password'
                    {...register('password')} />
            </div>
            <div className="form_submit">
                <button onClick={submit}>Submit</button>
                <a href="" onClick={setActive}>Already have account? Login</a>
            </div>

        </div>
    )
}
