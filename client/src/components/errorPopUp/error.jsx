import React from "react";
import "./error.css";

const Error = ({ error, setErrorPopUp }) => {
  return (
    <div className="error-cont">
      <div className="close" onClick={() => setErrorPopUp(false)}>
        X
      </div>
      <h1 className="error">Failure!!!{error}</h1>
    </div>
  );
};

export default Error;
