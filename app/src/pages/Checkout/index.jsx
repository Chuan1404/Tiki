import { Buttons, Header, Inputs, Loading } from "components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Item from "./Item";
import "./style.scss";
import { PAYMENT_METHOD, SHIPPING_METHOD } from "../../constants";

export default function Checkout() {
  const navigator = useNavigate();
  const { cart } = useSelector((store) => store.cart);
  const { city, district, ward } = useSelector((store) => store.address);
  const { user } = useSelector((store) => store.auth);
  const [checkList, setCheckList] = useState([]);
  const [sum, setSum] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkList.length != 0) {
      const list = cart.map((item) => item.productId);
      const newCheckList = checkList.filter((item) => list.includes(item));
      setCheckList(newCheckList);
    }
  }, [cart]);

  useEffect(() => {
    if (checkList.length != 0) {
      let newSum = 0;
      cart.forEach((item) => {
        if (checkList.includes(item.productId))
          newSum += item.quantity * item.productObject.price;
      });
      setSum(newSum);
    } else setSum(0);
  }, [checkList]);
  const initState = cart.length == 0;

  const handleChange = (e) => {
    if (e.target.checked)
      setCheckList(() => cart.map((item) => item.productId));
    else setCheckList([]);
  };
  const handleCheckAllItem = (id) => (e) => {
    if (e.target.checked) setCheckList([...checkList, id]);
    else setCheckList(() => checkList.filter((item) => item != id));
  };
  const handleDeleteCheckItem = () => {
    dispatch({
      type: "REMOVE_CARTS",
      payload: checkList,
    });
  };
  const handleSendOrder = () => {
    dispatch({
      type: "POST_ORDER",
      payload: {
        orderItems: checkList,
        shippingMethod: SHIPPING_METHOD.STANDARD,
        paymentMethod: PAYMENT_METHOD.CASH,
        userId: user.data._id,
        address: ward,
        province: city,
        district,
        note: "",
      },
    });
  };
  // if (initState) return <Loading />
  return (
    <>
      <Header />
      <div className="checkout">
        <div className="container">
          <div className="checkout_header">
            <h1>Giỏ hàng</h1>
          </div>
          <div className="checkout_list">
            {cart.length == 0 ? (
              <div className="no-list">
                <img src="/imgs/shopping.png" alt="" />
                <span>Không có sản phẩm nào trong giỏ hàng của bạn.</span>
                <Buttons
                  onClick={() => navigator("/")}
                  size="middle"
                  bgcolor="yellow"
                  radius
                >
                  Tiếp tục mua sắm
                </Buttons>
              </div>
            ) : (
              <div className="checkout_list-section">
                <div className="list">
                  <div className="list_control">
                    <div className="col_1">
                      <Inputs type="checkbox" onChange={handleChange}>
                        Tất cả
                      </Inputs>
                    </div>
                    <div className="col_2">
                      <span>Đơn giá</span>
                    </div>
                    <div className="col_3">
                      <span>Số Lượng</span>
                    </div>
                    <div className="col_4">
                      <span>Thành tiền</span>
                    </div>
                    <div className="col_5" onClick={handleDeleteCheckItem}>
                      <img src="/imgs/trash.svg" />
                    </div>
                  </div>
                  <div className="list_items">
                    {cart.map((item) => {
                      return (
                        <Item
                          key={item.productId}
                          id={item.productId}
                          name={item.productObject.name}
                          realPrice={item.productObject.price}
                          price={
                            item.productObject.discount != 0 &&
                            item.productObject.price
                          }
                          quantity={item.quantity}
                          img={item.productObject.thumbnailUrl}
                          isCheck={checkList.includes(item.productId)}
                          onChange={handleCheckAllItem}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="bill">
                  <div className="bill_info">
                    <span>Giao tới</span>
                    <p>
                      {user.data?.name} | {user.data?.phone}
                    </p>
                    <span>
                      {ward}, {district}, {city}
                    </span>
                  </div>
                  <div className="bill_sum">
                    <p>Tổng tiền</p>
                    <span className="sum">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(sum)}
                    </span>
                  </div>
                  <div className="bill_btn" onClick={handleSendOrder}>
                    <Buttons bgcolor="red" size="large" radius>
                      Mua Hàng
                    </Buttons>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
