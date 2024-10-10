import EmailForm from "./EmailForm";
import "./style.scss";


export default function LoginAdmin() {

  return (
    <div className="loginPopup">
      <div className="loginPopup_left">
        <EmailForm />
      </div>
      <div className="loginPopup_right">
        <img src="/imgs/login.png" alt="" />
        <div className="content">
          <p>Mua sắm tại Tiki</p>
          <p>Siêu ưu đãi mỗi ngày</p>
        </div>
      </div>
    </div>
  );
}
