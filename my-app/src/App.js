import React from "react";
import "./App.css";
import Nav from "./Components/nav/Nav";
import Section1 from "./Components/section1/Section1";
import Section2 from "./Components/section2/Section2";
import Section3 from "./Components/section3/Section3";
import Section4 from "./Components/section4/Section4";
import Detail1 from "./Components/detail/Detail1";
import Detail2 from "./Components/detail/Detail2";
import Detail3 from "./Components/detail/Detail3";
import Detail4 from "./Components/detail/Detail4";
import Detail5 from "./Components/detail/Detail5";
import Detail6 from "./Components/detail/Detail6";
import Detail7 from "./Components/detail/Detail7";
import Detail8 from "./Components/detail/Detail8";
import Detail9 from "./Components/detail/Detail9";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <div>
      {/* <Nav/>
      <Section1/>
      <Section2/>
      <Detail/>
      <Footer/> */}
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path="/Nav" element={<Nav />} />
            <Route path="/Section1" element={<Section1 />} />
            <Route path="/Section2" element={<Section2 />} />
            <Route path="/Section3" element={<Section3 />} />
            <Route path="/Section4" element={<Section4 />} />
            <Route path="/Detail1" element={<Detail1 />} />
            <Route path="/Detail2" element={<Detail2 />} />
            <Route path="/Detail3" element={<Detail3 />} />
            <Route path="/Detail4" element={<Detail4 />} />
            <Route path="/Detail5" element={<Detail5 />} />
            <Route path="/Detail6" element={<Detail6 />} />
            <Route path="/Detail7" element={<Detail7 />} />
            <Route path="/Detail8" element={<Detail8 />} />
            <Route path="/Detail9" element={<Detail9 />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;