"use client";

import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return (
    <ClipLoader
      size={150}
      color="#3B82f6"
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  );
};

export default Spinner;
