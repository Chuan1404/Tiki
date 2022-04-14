import Inputs from 'components/Inputs'
import { useForm } from 'hooks';
import React from 'react'
import { GrPrevious } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { closeLoginPopup } from 'store/slices/pageSlice';

export default function EmailForm({ setActive }) {
  const dispatch = useDispatch();
  const { form, register } = useForm({
    username: '',
    password: ''
  })
  const submit = () => {
    dispatch({
      type: 'LOGIN',
      payload: form
    })
    dispatch(closeLoginPopup())
  }
  return (
    <div className='emailForm'>
      <div className="emailForm_back">
        <GrPrevious onClick={setActive} color='rgb(131, 131, 131)' />
      </div>
      <div className="emailForm_content">
        <h3>Đăng nhập bằng email</h3>
        <p>Nhập email và mật khẩu tài khoản Tiki</p>
      </div>
      <div className='emailForm_form'>
        <Inputs
          type='email'
          placeholder='acb@email.com'
          {...register('username')} />
        <Inputs
          type='password'
          placeholder='Mật khẩu'
          {...register('password')} />
      </div>
      <div className="form_submit">
        <button onClick={submit}>Đăng nhập</button>
        <div>
          <a href="">Quên mật khẩu</a> <br />
          <span>Chưa có tài khoản?</span><a href="">Tạo tài khoản</a></div>
      </div>
    </div>
  )
}
