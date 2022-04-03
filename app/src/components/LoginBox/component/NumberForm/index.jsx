import React from 'react'
import { Inputs } from 'components';

export default function NumberForm({setActive}) {
  const InputStyle = {
    fontSize: 24,
  }
  

  return (
    <div className='numberForm'>
      <div className="numberForm_content">
        <h3>Xin chào,</h3>
        <p>Đăng nhập hoặc Tạo tài khoản</p>
      </div>
      <div className="numberForm_form">
        <div className="form_group">
          <Inputs
            type='tel'
            style={InputStyle}
            placeholder='Số điện thoại'
          />
        </div>
      </div>
      <div className="form_submit">
        <button>Tiếp tục</button>
        <a href="" onClick={setActive}>Đăng nhập bằng email</a>
      </div>
      
    </div>
  )
}
