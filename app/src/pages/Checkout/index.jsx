import { Buttons, Header, Inputs, Loading } from "components";
import React, { useCallback, useEffect, useState } from "react";
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

  // update checked list when carts change
  useEffect(() => {
    if (checkList.length == 0) return;

    const cartIds = new Set(cart.map((item) => item.id));
    setCheckList((prev) => prev.filter((id) => cartIds.has(id)));
  }, [cart]);

  // calculate total price of cart when checked list change
  useEffect(() => {
    if (checkList.length === 0) {
      setSum(0);
      return;
    }

    const checkSet = new Set(checkList);
    console.log(checkSet)
    console.log(cart)
    setSum(
      cart.reduce(
        (acc, item) =>
          acc +
          (checkSet.has(item.id) ? item.quantity * item.product.price : 0),
        0
      )
    );
  }, [checkList]);

  const handleChange = (e) => {
    if (e.target.checked) setCheckList(() => cart.map((item) => item.id));
    else setCheckList([]);
  };
  const handleCheckItem = useCallback((id) => (e) => {
    if (e.target.checked) setCheckList([...checkList, id]);
    else setCheckList(() => checkList.filter((item) => item != id));
  });
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
            <h1>Cart</h1>
          </div>
          <div className="checkout_list">
            {cart.length == 0 ? (
              <div className="no-list">
                <img src="/imgs/shopping.png" alt="" />
                <span>No product in your cart</span>
                <Buttons
                  onClick={() => navigator("/")}
                  size="middle"
                  bgcolor="yellow"
                  radius
                >
                  Continue shopping
                </Buttons>
              </div>
            ) : (
              <div className="checkout_list-section">
                <div className="list">
                  <div className="list_control">
                    <div className="col_1">
                      <Inputs type="checkbox" onChange={handleChange}>
                        All
                      </Inputs>
                    </div>
                    <div className="col_2">
                      <span>Price</span>
                    </div>
                    <div className="col_3">
                      <span>Quantity</span>
                    </div>
                    <div className="col_4">
                      <span>Total</span>
                    </div>
                    <div className="col_5" onClick={handleDeleteCheckItem}>
                      <img src="/imgs/trash.svg" />
                    </div>
                  </div>
                  <div className="list_items">
                    {cart.map((item) => {
                      return (
                        <Item
                          key={item.id}
                          id={item.id}
                          name={item.product?.name}
                          realPrice={item.product?.price}
                          price={
                            item.product?.discount != 0 && item.product?.price
                          }
                          quantity={item.quantity}
                          img={item.product?.thumbnailUrl}
                          isCheck={checkList.includes(item.id)}
                          onChange={handleCheckItem}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="bill">
                  <div className="bill_info">
                    <span>Delivery to</span>
                    <p>
                      {user.data?.name} | {user.data?.phone}
                    </p>
                    <span>
                      {ward}, {district}, {city}
                    </span>
                  </div>
                  <div className="bill_sum">
                    <p>Total</p>
                    <span className="sum">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(sum)}
                    </span>
                  </div>
                  <div className="bill_btn" onClick={handleSendOrder}>
                    <Buttons bgcolor="red" size="large" radius>
                      Buy
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
