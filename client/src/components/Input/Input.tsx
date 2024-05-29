import { useState } from "react";
import randomize from "../../icons/randomize.png";
import password from "../../icons/password.png";
import passwordHidden from "../../icons/password_hidden.png";
import correct from "../../icons/correct.png";
import alert from "../../icons/alert.png";

interface InputProps {
  placeholder?: string;
  type: string;
  state: string;
  registerType: any;
  handleBlur?: any;
}

export default function Input({
  placeholder,
  type,
  state,
  registerType,
  handleBlur,
}: InputProps) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);

  function showPassword() {
    setIsPasswordShown(!isPasswordShown);
  }

  function showIcon(state: string) {
    switch (state) {
      case "default": {
        return type === "password" && isPasswordShown ? (
          <img
            className="password__icon"
            src={password}
            alt="password"
            onClick={showPassword}
            onMouseDown={(e) => e.preventDefault()}
          />
        ) : type === "password" && !isPasswordShown ? (
          <img
            className="password__icon"
            src={passwordHidden}
            alt="password"
            onClick={showPassword}
            onMouseDown={(e) => e.preventDefault()} 
          />  
        ) : type === "name" ? (
          <img
            className="randomize__icon"
            src={randomize}
            alt="randomize name"
            onMouseOver={() => setIsAlertShown(true)}
            onMouseOut={() => setIsAlertShown(false)}
          />
        ) : null;
      }
      case "correct": {
        return <img className="correct__icon" src={correct} alt="correct" />;
      }
      default: {
        return (
          <img
            className="alert__icon"
            src={alert}
            alt="wrong value"
            onMouseOver={() => setIsAlertShown(true)}
            onMouseOut={() => setIsAlertShown(false)}
          />
        );
      }
    }
  }

  return (
    <div className="custom__input__wrapper" onBlur={handleBlur}>
      <input
        className={`custom__input ${
          state === "default"
            ? "default"
            : state === "correct"
            ? "correct"
            : "alert"
        }`}
        placeholder={`${placeholder}`}
        type={
          type === "password" && isPasswordShown
            ? "text"
            : type === "password"
            ? "password"
            : "text"
        }
        {...registerType}
      />
      {showIcon(state)}
      {isAlertShown && type === "name" ? (
        <div className="alert__message">
          <p>Random name</p>
        </div>
      ) : isAlertShown ? (
        <div className="alert__message">
          <p>{state}</p>
        </div>
      ) : null}
    </div>
  );
}
