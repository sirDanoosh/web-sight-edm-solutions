import "./index.scss";

export enum BTN_VARIANT {
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  PRIMARY = "primary",
}

type TButton = {
  title: string;
  iconUrl?: string;
  disabled?: boolean;
  variant?: BTN_VARIANT;
} & (
  | {
      href?: undefined;
      onClick: () => void;
    }
  | {
      href: string;
      onClick?: undefined;
    }
);

const Button: React.FC<TButton> = (props) => {
  const {
    onClick,
    title,
    disabled = false,
    href,
    iconUrl,
    variant = BTN_VARIANT.PRIMARY,
  } = props;

  return href ? (
    <a
      href={href}
      className={`button${disabled ? " button--disabled" : ""} btn--${variant}`}
    >
      {iconUrl && <img src={iconUrl} className="button__icon" alt={title} />}
      <span className="button__txt">{title}</span>
    </a>
  ) : (
    <button
      className={`button ${disabled ? " button--disabled" : ""}btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconUrl && <img src={iconUrl} className="button__icon" alt={title} />}
      <span className="button__txt">{title}</span>
    </button>
  );
};

export default Button;
