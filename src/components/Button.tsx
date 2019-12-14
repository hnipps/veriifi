import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { combineClasses } from "../utils/combineClasses";
import { string } from "prop-types";

export interface UniqueButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  element: "button";
}

export interface UniqueAnchorProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  element: "a";
}

export interface UniqueRouterLinkProps extends LinkProps {
  element: typeof Link;
}

export type ButtonProps = (
  | UniqueAnchorProps
  | UniqueButtonProps
  | UniqueRouterLinkProps
) & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};

const variantClassMap = {
  primary: "bg-dark-blue white",
  secondary: "bg-light-gray dark-gray",
  disabled: "bg-light-gray gray no-pointer-events"
};

const Button = ({
  element: Element,
  variant = "primary",
  className,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    // @ts-ignore
    <Element
      className={combineClasses(
        className,
        variantClassMap[disabled ? "disabled" : variant],
        "w-100 mw4 br2 bn dib f6 fw5 tc ph2 pv1 no-underline flex items-center justify-center cursor-default"
      )}
      {...props}
    />
  );
};

export default Button;
