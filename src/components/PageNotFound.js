// Imports
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page is not Exit, Please Go to Dashboard</h1>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

// Export
export default PageNotFound;
