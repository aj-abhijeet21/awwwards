import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  containerClass?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const { children, title, id, rightIcon, leftIcon, containerClass, ...rest } =
    props;
  return (
    <button
      {...rest}
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {rightIcon}
    </button>
  );
};

export default Button;
