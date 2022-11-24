import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "info" | "danger";
  size?: "sm" | "md";
}

const Button = ({ label, variant, size, ...props }: ButtonProps) => {
  const btnVariant = variant ? styles[`btn-${variant}`] : styles.primary;
  const btnSize = size ? styles[`btn-${size}`] : styles["btn-sm"];

  return (
    <button className={`${styles.btn} ${btnVariant} ${btnSize}`} {...props}>
      {label}
    </button>
  );
};
export default Button;
