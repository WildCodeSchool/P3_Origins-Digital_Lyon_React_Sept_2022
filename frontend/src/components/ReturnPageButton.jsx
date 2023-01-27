import React from "react";
import { useNavigate } from "react-router-dom";

export default function ReturnPageButton() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <button type="button" className="backButton" onClick={goBack}>
      <svg
        width="41"
        height="38"
        viewBox="0 0 41 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.1538 35.3077L3 19.1538L19.1538 3"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.24365 19.1541H38.0001"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
