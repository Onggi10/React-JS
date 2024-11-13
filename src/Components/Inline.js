import React from "react";

const heading = {
  fontsize: "75px",
  color: "Orange",
};

export default function Inline() {
  return (
    <div>
      <h1 className="error" style={heading}>
        Inline Styles
      </h1>
      <p style={heading}>Inline styles are defined directly in the JSX</p>
    </div>
  );
}
