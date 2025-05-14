const Button = ({ text, variant = "primary", onclick }) => {
  return (
    <button
      className={`
        ${
          variant === "primary"
            ? "bg-primary hover:bg-primary-hover"
            : "border border-primary hover:bg-primary-hover text-text"
        }
        rounded-sm px-4 py-2 text-white text-xl`}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
