import { ChangeEvent } from "react";
import "./index.scss";

interface IInput {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "password";
  className?: string;
  progress?: number;
}

const Input: React.FC<IInput> = (props) => {
  const { progress, className, ...rest } = props;
  return (
    <input
      className={`input ${className} ${
        progress ? "input--" + progress : ""
      }`.trim()}
      {...rest}
    />
  );
};

export default Input;
