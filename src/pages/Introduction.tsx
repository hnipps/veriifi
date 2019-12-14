import React from "react";
import { Link } from "react-router-dom";

import Heading from "../components/Heading";
import Button from "../components/Button";

const Introduction = () => (
  <>
    <Heading element="h1" className="tc">
      Welcome!
    </Heading>
    <p>To open your account we need to verify your identity.</p>
    <p>You'll need the following:</p>
    <ul>
      <li>Government-issued ID</li>
      <li>A clear photo of yourself</li>
    </ul>
    <Button element={Link} to="/id" className="center">
      Continue
    </Button>
  </>
);

export default Introduction;
