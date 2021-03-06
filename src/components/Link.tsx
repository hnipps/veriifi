import React from "react";
import { Link as RouterLink } from "react-router-dom";

import "./link.css";

const regClasses = "white bg-dark-blue";
const disabledClasses = "link--disabled gray bg-light-gray";

const Link = ({
  disabled = false,
  to,
  children
}: {
  disabled?: boolean;
  to: string;
  children: string;
}) => {
  return (
    <RouterLink
      className={`link mw4 h2 ph2 flex justify-center items-center no-underline ${
        disabled ? disabledClasses : regClasses
      }`}
      to={to}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
