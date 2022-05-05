import { Buttons, Inputs, Loading } from 'components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Item from './Item';
import './style.scss';


export default function Checkout() {
  const navigator = useNavigate();
  const { cart } = useSelector(store => store.cart);
  const { city, district, ward } = useSelector(store => store.address)
  const { user } = useSelector(store => store.auth)
  const [checkList, setCheckList] = useState([]);
  const [sum, setSum] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    if (checkList.length != 0) {
      const list = cart.listItems.map(item => item.product._id)
      const newCheckList = checkList.filter(item => list.includes(item));
      setCheckList(newCheckList)
    }
  }, [cart])

  useEffect(() => {
    if (checkList.length != 0) {
      let newSum = 0;
      cart.listItems.forEach(item => {
        if (checkList.includes(item.product._id)) newSum += item.quantity * item.product.real_price
      })
      setSum(newSum)
    } else setSum(0)
  }, [checkList])
  const initState = cart.length == 0

  const handleChange = e => {
    if (e.target.checked) setCheckList(() => cart.listItems.map(item => item.product._id))
    else setCheckList([])
  }
  const handleCheckAllItem = id => e => {
    if (e.target.checked) setCheckList([...checkList, id])
    else setCheckList(() => checkList.filter(item => item != id))
  }
  const handleDeleteCheckItem = () => {
    dispatch({
      type: 'REMOVE_CARTS',
      payload: checkList
    })
  }
  const handleSendOrder = () => {
    console.log([...checkList.map(id => {
      return { id }
    })])
    dispatch({
      type: 'POST_ORDER',
      payload: {
        orderItems: [
          [...checkList.map(id => { return { id } })]
        ],
        shippingMethod: "standard",
        paymentMethod: "card",
        name: user.data.name,
        phone: user.data.phone,
        email: user.data.email,
        address: ward,
        province: city,
        district,
        note: ""
      }
    })
  }
  if (initState) return <Loading />
  return (
    <div className='checkout'>
      <div className="container">
        <div className="checkout_header">
          <h1>Giỏ hàng</h1>
        </div>
        <div className="checkout_list">
          {cart.listItems?.length == 0 ?
            <div className='no-list'>
              <img src="/imgs/shopping.png" alt="" />
              <span>Không có sản phẩm nào trong giỏ hàng của bạn.</span>
              <Buttons onClick={() => navigator('/')} size='middle'
                bgcolor='yellow'
                radius>
                Tiếp tục mua sắm
              </Buttons>
            </div> :
            <div className='checkout_list-section'>
              <div className="list">
                <div className="list_control">
                  <div className='col_1'><Inputs type='checkbox' onChange={handleChange}>Tất cả</Inputs></div>
                  <div className='col_2'><span>Đơn giá</span></div>
                  <div className='col_3'><span>Số Lượng</span></div>
                  <div className='col_4'><span>Thành tiền</span></div>
                  <div className='col_5' onClick={handleDeleteCheckItem}><img src='/imgs/trash.svg' /></div>
                </div>
                <div className='list_items'>
                  {cart.listItems.map(item => {
                    return <Item
                      key={item.product.id}
                      id={item.product._id}
                      name={item.product.name}
                      realPrice={item.product.real_price}
                      price={item.product.discount != 0 && item.product.price}
                      quantity={item.quantity}
                      img={item.product.images[0].thumbnail_url}
                      isCheck={checkList.includes(item.product._id)}
                      onChange={handleCheckAllItem} />
                  })}
                </div>
              </div>
              <div className="bill">
                <div className="bill_info">
                  <span>Giao tới</span>
                  <p>{user.data.name} | {user.data.phone}</p>
                  <span>{ward}, {district}, {city}</span>
                </div>
                <div className="bill_sum">
                  <p>Tổng tiền</p>
                  <span className='sum'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sum)}</span>
                </div>
                <div className="bill_btn" onClick={handleSendOrder}>
                  <Buttons
                    bgcolor='red'
                    size='large'
                    radius>Mua Hàng</Buttons>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}
