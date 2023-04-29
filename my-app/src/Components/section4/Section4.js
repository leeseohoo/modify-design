import React from "react";
import url from './url.png';
import Nav from 'C:/Users/user/Downloads/hpe-modify/hpe-example-main/my-app/src/Components/nav/Nav';
import { FaHome } from 'react-icons/fa';


const Section4 = () => {
    return (
        <div className="section4">
            <Nav/>
            <div className="section">
            <a name="target4"></a>
            <h3 className="back"><a className="top" href="http://localhost:3000/"><FaHome />HOME</a></h3>
            <p className="major"><span>THE LATEST NEWS</span></p>
            <br/>
            <div className="article">
                <div className="news-img">
                    <img className="photos" src="#"/>
                    <img className="photos" src="#"/>
                    <img className="photos" src="#"/>
                    <img className="photos" src="#"/>
                    <img className="photos" src="#"/>
                    <br/>
                    <br/>
                </div>
                <hr className="featurette-divider"/>
                <p className="comment">For more Information✨</p>
                <div className="link">
                    <a href="https://cafe.naver.com/maritimesmartcloth">
                        <p>https://cafe.naver.com/maritimesmartclot</p>
                    </a>
                </div>
                <div className="thumb">
                    <a href="https://cafe.naver.com/maritimesmartcloth">
                        <img src={url} width="680" height="330"/>
                    </a>
                    <br/>
                    <br/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Section4