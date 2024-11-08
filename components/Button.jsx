"use client";
const Button = ({
  disabled,
  hasIcon,
  onPress,
  bgColor,
  textColor,
  fontSize,
  padding,
  radius,
  children,
}) => {
  if (hasIcon) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onPress}
        className={`w-full ${bgColor ? `${bgColor}` : "bg-green-500"}  ${
          padding ? `${padding}` : "p-2"
        } ${radius ? `rounded-${radius}` : "rounded-3xl"} `}
      >
        <div className="flex justify-center items-center">{children}</div>
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPress}
      className={`w-full ${bgColor ? `${bgColor}` : "bg-green-500"}  ${
        padding ? `${padding}` : "p-2"
      } ${radius ? `rounded-${radius}` : "rounded-3xl"}`}
    >
      <p
        className={`${textColor ? `text-${textColor}` : "text-white"} ${
          fontSize ? `text-${fontSize}` : "text-base"
        } text-center font-bold`}
      >
        {children}
      </p>
    </button>
  );
};

export default Button;
