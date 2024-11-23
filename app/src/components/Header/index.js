import { Loading, Search } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { openLogin } from "store/slices/pageSlice";
import "./style.scss";
import { Avatar, Dropdown, Space } from "antd";
import { DownOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "@mui/material";

export default function Header() {
  const [isFocus, setIsFocus] = useState(false);
  const { user, isLogin } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openPopup = () => {
    if (!isLogin) dispatch(openLogin());
  };
  const openCart = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) openPopup();
    else navigate("/checkout");
  };
  if (isLogin && isNaN(cart?.length)) return <Loading />;
  return (
    <header className={`header ${isFocus && "active"}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <img src="/imgs/logo.png" alt="" />
          </Link>
        </div>
        <div className="header_search">
          <Search isFocus={isFocus} setIsFocus={setIsFocus} />
        </div>
        <div className="users">
          <div className="users_item" onClick={openPopup}>
            {/* <img src="/imgs/user.png" alt="" />
                        <span>{user?.name}</span> */}
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size={48} icon={<UserOutlined />} />
                  <Typography>{user?.name}</Typography>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className="users_item" onClick={openCart}>
            <img src="/imgs/cart.png" alt="" />
            <span>Cart</span>
            {cart && <div className="quality">{cart.length}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}

const items = [
    {
      key: '1',
      label: 'My Account',
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: 'Profile',
      extra: '⌘P',
    },
    {
      key: '3',
      label: 'Billing',
      extra: '⌘B',
    },
    // {
    //   key: '4',
    //   label: 'Settings',
    //   icon: <SettingOutlined />,
    //   extra: '⌘S',
    // },
  ];