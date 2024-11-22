// import { Form, Button } from "react-bootstrap";

import LoginAdmin from "components/Popup/components/LoginAdmin";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Admin() {
  const { user, isLogin } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/admin", { replace: true });
    } else {
      navigate("/admin/login", { replace: true });
    }
  }, [isLogin, navigate]);

  return (
    <div id="admin-login">
      <div className="container admin-login-container">
        <LoginAdmin />
      </div>
    </div>
  );
}
