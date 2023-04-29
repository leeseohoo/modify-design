import icon from './icon.png';
import {Link} from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom'
import { FaHome, FaChild, FaHeartbeat, FaWind, FaTemperatureHigh } from 'react-icons/fa';
import fall from './fall.png';
import lean from './lean.png';
import run from './run.png';
import sit from './sit.png';
import stand from './stand.png';
import walk from './walk.png';

const Section2 = () => {
    // const [message, setMessage] = useState('');

    // useEffect(() => {
    //     const WebSocket = require('ws');
    //     const socket = new window.WebSocket('ws://localhost:8080');

    //     socket.onmessage = (event) => {
    //       setMessage(event.data);
    //       console.log(event.data);
    //       let parse_data = JSON.parse(event.data)
    //       let hr = parse_data.heartrate
    //       let rp = parse_data.resp
    //       let tp = parse_data.temp
    //       console.log(parse_data)
    //       if (parse_data.user === 'user1'){
    //         user1_hr=hr;
    //         user1_rp=rp;
    //         user1_tp=tp;
    //       }
    //     };
    //     return () => {
    //       if(socket.readyState===1){
    //         socket.close();
    //       }
    //     };
    //   }, []);

    return (
        <div className="section">
            {/* <p>{message}</p> */}
            <div className="experience">
                <div>
                <div className="row1">
                <div className="square">
                <Link to={"/Detail1"}>
                    <div id="data" className="click">#1</div>
                    <img className="pic" src={fall} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>  
                </div>
                <div className="row1">
                <div className="square">
                <Link to={"/Detail2"}>
                    <div id="data" className="click">#2</div><br/>
                    <img className="pic" src={lean} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>                 
                </div>
                <div className="row1">
                <div className="square">
                <Link to={"/Detail3"}>
                    <div id="data" className="click">#3</div><br/>
                    <img className="pic" src={walk} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>                  
                </div>
                </div>
                <div>
                <div className="row2">
                <div className="square">
                <Link to={"/Detail4"}>
                    <div id="data" className="click">#4</div><br/>
                    <img className="pic" src={run} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>                 
                </div>
                <div className="row2">
                <div className="square">
                <Link to={"/Detail5"}>
                    <div id="data" className="click">#5</div><br/>
                    <img className="pic" src={sit} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>           
                </div>
                <div className="row2">
                <div className="square">
                <Link to={"/Detail6"}>
                    <div id="data" className="click">#6</div><br/>
                    <img className="pic" src={stand} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>               
                </div>
                </div>

                <div>
                <div className="row3">
                <div className="square">
                <Link to={"/Detail7"}>
                    <div id="data" className="click">#7</div><br/>
                    <img className="pic" src={stand} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>                 
                </div>
                <div className="row3">
                <div className="square">
                <Link to={"/Detail8"}>
                    <div id="data" className="click">#8</div><br/>
                    <img className="pic" src={stand} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>             
                </div>
                <div className="row3">
                <div className="square">
                <Link to={"/Detail9"}>
                    <div id="data" className="click">#9</div><br/>
                    <img className="pic" src={stand} height="45px" alt="main"/>
                    <div id="hr"><FaHeartbeat/> : </div>
                    <div id="rp"><FaWind/> : </div>
                    <div id="tp"><FaTemperatureHigh/> : </div>
                </Link>              
                </div>               
                </div>
                </div>
            </div>
        </div>
    )
}

export default Section2