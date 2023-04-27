import React from "react";
import "./index.scss";
import LoginBox from "src/components/LoginBox";

const LoginPage: React.FC<{}> = () => {
  return (
    <div className="login-page">
      <div className="login-page__bg" />
      <div className="login-page__content">
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginPage;
