import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  element: "h1" | "h2" | "h3";
}

const Heading = ({ element: Element, className, ...props }: HeadingProps) => (
  <Element className={`${className} tracked-tight ma0`} {...props}></Element>
);

export default Heading;
