import React from "react";
import { Link } from "react-router-dom";

import Heading from "./Heading";
import Button from "./Button";

import "./header.css";

const Header = () => {
  return (
    <header className="w-100 h3 ba b--dark-gray pa2 flex items-center justify-center">
      <div className="mw7 header__container flex justify-between">
        <Heading element="h1" className="black f1">
          Verïfi
        </Heading>
        <Button element={Link} to="/" variant="secondary" className="mv2">
          Sign up
        </Button>
      </div>
    </header>
  );
};

export default Header;
