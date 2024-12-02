import React from "react";
import clsx from "clsx";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  fontSize?: string;
  fontWeight?: string;
  className?: string;
  error?: boolean;
  disabled?: boolean;
}

const Text: React.FC<TextProps> = ({
  fontSize = "text-base",
  fontWeight = "font-normal",
  className,
  error = false,
  disabled = false,
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(
        fontSize,
        fontWeight,
        "transition-all duration-300 ease-in-out",
        {
          "text-red-500 dark:text-red-400": error,
          "text-gray-400 dark:text-gray-500 cursor-not-allowed": disabled,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Text;
