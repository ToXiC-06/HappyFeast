import styles from "./Button.module.css";

function Button({ onClick, css = "btn btn-warning", children }) {
  return (
    <button onClick={onClick} className={`${css} ${styles.btn}`}>
      {children}
    </button>
  );
}

export default Button;
