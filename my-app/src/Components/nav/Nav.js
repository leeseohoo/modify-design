import React from "react";
import logo from './logo.png';
import { Link, Navigate } from "react-router-dom";

const onClickSection1 = () => {
    return <Navigate to="/Section1" />;
}
const onClickSection2 = () => {
    return <Navigate to="/Section2" />;
}
const onClickSection3 = () => {
    return <Navigate to="/Section3" />;
}
const onClickSection4 = () => {
    return <Navigate to="/Section4" />;
}

const Nav = () => {
    return (
        <nav className = "menu-bar">
            <div className = "index">
                <div className = "img">
                    <a className="top" href="http://localhost:3000/">
                        <img className="porfile-img" src ={logo} alt="profile"/>
                    </a>
                </div>
                <br/>
                {/* <Link to={"/section2"}>
                    <h3 className="click" onClick={onClickSection2}>MEMBER</h3>
                </Link> */}
                <Link to={"/section1"}>
                    <h3 className="click" onClick={onClickSection1}>SUBJECT</h3>
                </Link>
                <Link to={"/section4"}>
                    <h3 className="click" onClick={onClickSection4}>INFORMATION</h3>
                </Link>
                <Link to={"/section3"}>
                    <h3 className="click" onClick={onClickSection3}>CONTACT</h3>
                </Link>
                {/* <a href="#target1"><h3 className="click" onClick={onClickSection1}>ABOUT</h3></a>
                <a href="#target2"><h3 className="click" onClick={onClickSection2}>MEMBER</h3></a>
                <a href="#target3"><h3 className="click" onClick={onClickSection3}>CONTACT</h3></a>
                <a href="#target4"><h3 className="click" onClick={onClickSection4}>INFORMATION</h3></a> */}
            </div>
        </nav>
    )
}

export default Nav