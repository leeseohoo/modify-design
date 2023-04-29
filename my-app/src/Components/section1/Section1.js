import React from "react";
import main from './main.png';
import Nav from 'C:/Users/user/Downloads/hpe-modify/hpe-example-main/my-app/src/Components/nav/Nav';
import { FaHome } from 'react-icons/fa';


const Section1 = () => {
    return (
        <div className="section1">
            <Nav/>
            <div className="section">
            <a name="target1"></a>            
            <h3 className="back"><a className="top" href="http://localhost:3000/"><FaHome />HOME</a></h3>
            <div className="name">
                OCEAN LAB
            </div>
            <div className="main-introduction">
                <div className="title"><h3>불법외국어선 단속강화</h3></div>
                <h5>해경특수기동대원 원격 생체신호 모니터링 시스템</h5>
            </div>
            <img className="main" src={main} width="555px" alt="main"/>
            
            </div>
        </div>
    )
}

export default Section1