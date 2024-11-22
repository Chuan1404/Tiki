import {
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ProductOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import "./style.scss";

const items = [
  { key: "1", icon: <PieChartOutlined />, label: <Link to="/admin/">Dashboard</Link>},
  { key: "2", icon: <DesktopOutlined />, label: <Link to="/admin/user">User</Link> },
  { key: "3", icon: <ContainerOutlined />, label: <Link to="/admin/category">Category</Link> },
  { key: "4", icon: <ProductOutlined />, label: <Link to="/admin/product">Product</Link> },
  // { key: "5", icon: <ContainerOutlined />, label: <Link to="/admin/order">Order</Link> },
  { key: "5", icon: <ShoppingCartOutlined />, label: <Link to="/admin/cart">Cart</Link> },
];

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, isLogin } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  useEffect(() => {
    if (!isLogin) {
      navigate("/admin/login", { replace: true });
    } 
  }, [isLogin, navigate]);
  return (
    <div id="admin" style={{display: 'flex'}}>
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100vh" }}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div
        className="container admin-container"
        style={{ width: '100%', height: '100vh' }}
      >
        <Outlet />
      </div>
    </div>
  );
}
