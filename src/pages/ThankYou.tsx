import React from "react";

import Heading from "../components/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ThankYou = () => (
  <>
    <Heading element="h1" className="tc mt5">
      Thank you!
    </Heading>
    <div className="flex justify-center">
      <FontAwesomeIcon icon={faCheckCircle} className="green mt4" size="9x" />
    </div>
  </>
);

export default ThankYou;
