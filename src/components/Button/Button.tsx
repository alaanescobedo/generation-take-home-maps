import { ButtonProps } from "../../types";

import styles from "./Button.module.css";

export const Button = ({ label, variant, size, ...props }: ButtonProps) => {
  const btnVariant = variant ? styles[`btn-${variant}`] : styles.primary;
  const btnSize = size ? styles[`btn-${size}`] : styles["btn-sm"];

  return (
    <button className={`${styles.btn} ${btnVariant} ${btnSize}`} {...props}>
      {label}
    </button>
  );
};
export default Button;
