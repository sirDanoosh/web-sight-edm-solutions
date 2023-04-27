import { ChangeEvent } from "react";
import "./index.scss";

interface IInput {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  progress?: 25 | 50 | 75 | 100;
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
