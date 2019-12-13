import React from "react";
import Link from "../components/Link";

const Introduction = () => (
  <>
    <h1 className="tc">Welcome!</h1>
    <p>To open your account we need to verify your identity.</p>
    <p>You'll need the following:</p>
    <ul>
      <li>Government-issued ID</li>
      <li>A clear photo of yourself</li>
    </ul>
    <Link to="/id">Continue</Link>
  </>
);

export default Introduction;
