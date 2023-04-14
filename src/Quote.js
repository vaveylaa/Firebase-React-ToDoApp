import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";

const Quote = () => {
    const [quote, setQuote] = useState("");
    useEffect(() => {
      fetch("https://api.quotable.io/random")
        .then((response) => response.json())
        .then((data) => {
          setQuote(data.content);
        });
    }, []);
    
  return (
      <div>
        <hr />
        <p className="quote-box"><FontAwesomeIcon icon={faQuoteLeft} /> {quote} <FontAwesomeIcon icon={faQuoteRight} /></p>
      </div>
   );
  };
export default Quote;