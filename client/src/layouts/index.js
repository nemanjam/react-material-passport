import React, { Component, Fragment } from "react";
import Navbar from "./components/Navbar";

export default function Layouts(props) {
  return (
    <Fragment>
      <Navbar />
      <div style={{ marginTop: "64px" }}>{props.children}</div>
    </Fragment>
  );
}
