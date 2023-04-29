import React, { useState, useEffect } from "react";
import Nav from "./nav/Nav";
import Section1 from "./section1/Section1";
import Section2 from "./section2/Section2";
import Section3 from "./section3/Section3";
import Section4 from "./section4/Section4";

function Home() {
  return (
    <div>
      <Nav />
      <Section2 />
      {/* <Section1 />
      <Section2 />
      <Section3 />
      <Section4 /> */}
      {/* <Footer /> */}
      {/* <Temp /> */}
    </div>
  );
}

export default Home;
