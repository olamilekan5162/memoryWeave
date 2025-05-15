const Button = ({ text, variant = "primary", onclick }) => {
  return (
    <button
      className={`
        ${
          variant === "primary"
            ? "bg-primary hover:opacity-80 text-white"
            : "border border-primary hover:bg-primary hover:text-white text-text"
        }
        rounded-sm px-4 py-2 text-xl`}
      onClick={onclick}
    >
      {text}
    </button>
  );
};

export default Button;
