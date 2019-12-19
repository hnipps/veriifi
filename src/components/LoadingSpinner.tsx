import React from "react";

import { LoadingSpinnerProps } from "./loading-spinner.props";

import "./loading-spinner.css";
import { combineClasses } from "../utils/combineClasses";

const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className={combineClasses("la-ball-spin la-3x", className)}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
