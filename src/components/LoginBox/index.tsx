import React from "react";
import ViewerLogo from "src/assets/images/viewer-64.png";
import EditorLogo from "src/assets/images/editor-64.png";
import Input from "src/components/Input";
import Button from "src/components/Button";
import useLoginBox from "./useLoginBox";
import "./index.scss";

const LoginBox: React.FC<{}> = () => {
  const {
    changeUserType,
    submitHandler,
    updatePassword,
    updateUserName,
    tagValidationList,
    userType,
    isSubmittable,
    progress,
  } = useLoginBox();

  return (
    <div className="login-box">
      <h5>I'm a</h5>
      <div className="login-box__user-type-wrapper">
        <label
          htmlFor="viewer"
          className={`user-type-btn ${
            userType === "viewer" ? "user-type-btn--selected" : ""
          }`}
        >
          <h4>Viewer</h4>
          <img src={ViewerLogo} alt="Viewer" />
          <input
            type="radio"
            id="viewer"
            name="userType"
            value="viewer"
            onChange={changeUserType}
          />
        </label>

        <label
          htmlFor="editor"
          className={`user-type-btn ${
            userType === "editor" ? "user-type-btn--selected" : ""
          }`}
        >
          <h4>Editor</h4>
          <img src={EditorLogo} alt="Editor" />
          <input
            type="radio"
            id="editor"
            name="userType"
            value="editor"
            onChange={changeUserType}
          />
        </label>
      </div>
      <div className="login-box__form">
        <Input onChange={updateUserName} placeholder="UserName" />
        <Input
          onChange={updatePassword}
          placeholder="Password"
          type="password"
          progress={progress}
        />
        <div className="tag-wrapper">
          <span
            className={`tag ${tagValidationList.min8 ? "tag--approved" : ""}`}
          >
            at least 8 characters
          </span>
          <span
            className={`tag ${tagValidationList.min1u ? "tag--approved" : ""}`}
          >
            at least 1
            <b>
              <i>uppercase</i>
            </b>
            character
          </span>
          <span
            className={`tag ${tagValidationList.min1l ? "tag--approved" : ""}`}
          >
            at least 1
            <b>
              <i>lowercase</i>
            </b>
            character
          </span>
          <span
            className={`tag ${tagValidationList.min1s ? "tag--approved" : ""}`}
          >
            at least 1
            <b>
              <i>special</i>
            </b>
            character
          </span>
        </div>
      </div>
      <Button
        onClick={submitHandler}
        title="Submit"
        disabled={!isSubmittable}
      />
    </div>
  );
};

export default LoginBox;
