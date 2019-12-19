import React from "react";
import { combineClasses } from "../utils/combineClasses";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  element: "h1" | "h2" | "h3";
}

const Heading = ({ element: Element, className, ...props }: HeadingProps) => (
  <Element
    className={combineClasses(className, "tracked-tight ma0 bodoni")}
    {...props}
  ></Element>
);

export default Heading;
