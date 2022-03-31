import React from 'react'
import { Inputs } from 'components';

export default function NumberForm() {
  const InputStyle = {
    borderBottom: '1px solid rgb(224, 224, 224)',
    fontSize: 24,
    paddingLeft: 0
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
    </div>
  )
}
