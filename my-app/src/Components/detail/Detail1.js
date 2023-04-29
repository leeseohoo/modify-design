import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import WebSocket, {WebSocketServer} from "ws";
import ApexChart from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { FaHome, FaChild, FaHeartbeat, FaWind, FaTemperatureHigh } from 'react-icons/fa';

let user1_hr = 0;
let user1_rp = 0;
let user1_tp = 0;

// let user1_hr = 0;
// let user1_rp = 0;
// let user1_tp = 0;
// const str = 'one';

const Detail = () => {
  const [message, setMessage] = useState('');
  const [hr, setHr] = useState([])
  const [rp, setRp] = useState([])
  const [tp, setTp] = useState([])
  const [categories, setCategories] = useState([])


  useEffect(() => {
    setInterval(() => {
      const time = new Date(new Date().getTime());
      const timeStr = `${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
 
      setCategories(prev => ([...prev, timeStr]))
    }, 3000)
    const WebSocket = require('ws');

    const socket = new window.WebSocket('ws://localhost:8080');
    
    socket.onmessage = (event) => {
      setMessage(event.data);
      console.log(event.data);
      let parse_data = JSON.parse(event.data)
      let hr = parse_data.heartrate
      let rp = parse_data.resp
      let tp = parse_data.temp
      console.log(parse_data)

    

      // console.log(event)
      // const arr1 = event.data.split(",")
      // const timestamp = arr1[0]
      // const batteryLv = arr1[2]
      // const hr = Integer.parseInt(arr1[3])
      // const rp = Integer.parseInt(arr1[5])
      // const tp = Integer.parseInt(arr1[4])
      // const ur = arr1[9]
      if (parse_data.user === 'user1'){
        setHr(prev => ([...prev, hr]))
        setRp(prev => ([...prev, rp]))
        setTp(prev => ([...prev, tp]))
      }
      // setMessage(event.data);
      
      // let ur = parse_data.user
      // let rp = parse_data.resp
      // let tp = parse_data.temp

      
      // if (ur===str){
      //   console.log('timestamp: '+timestamp)
      //   console.log('batteryLv: '+batteryLv)
      //   console.log('ur: '+ur)
      //   console.log('hr: '+hr)
      //   console.log('rp: '+rp)
      //   console.log('tp: '+tp)
      //   user1_hr=hr;
      //   user1_rp=rp;
      //   user1_tp=tp;
      //   console.log(message + "수신");
      // }
    };

    return () => {
      if(socket.readyState===1){
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
      console.log("hr :" + hr)
      ApexCharts.exec('realtime', 'updateSeries', [{
      data: hr
    }])
  }, [hr]);
  useEffect(() => {
      console.log("rp :" + rp)
      ApexCharts.exec('realtime', 'updateSeries', [{
      data: rp
    }])
  }, [rp]);
  useEffect(() => {
      console.log("tp :" + tp)
      ApexCharts.exec('realtime', 'updateSeries', [{
      data: tp
      }])
  }, [tp]);

  const option1 = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#FF9999'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Heart Rate',
    //   align: 'left'
    // },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category',
      range: 10,
      categories: categories
    },
    legend: {
      show: false
    }
  }

  const option2 = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#9ACD32'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Respiration Rate',
    //   align: 'left'
    // },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category',
      range: 10,
      categories: categories
    },
    legend: {
      show: false
    }
  }

  const option3 = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#66B2FF'],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: 'smooth'
    },
    // title: {
    //   text: 'Body Temperature',
    //   align: 'left'
    // },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category',
      range: 10,
      categories: categories
    },
    legend: {
      show: false
    }
  }

  return (
    <div className="detail">
      <p>{message}</p>
      <h3 className="back">
        <a className="top" href="http://localhost:3000/"><FaHome />HOME</a>
      </h3>
      <div id="parent">
        <div id="title1">
        <p id="title11"><FaHeartbeat /> Heart Rate</p>
        <ReactApexChart options={option1} series={[{data:hr}]} type="line" width={"100%"} height={350}/>
        </div>
        <div id="title2">
        <p id="title12"><FaWind /> Respiration Rate</p>
        <ReactApexChart options={option2} series={[{data:rp}]} type="line" width={"100%"} height={350}/>
        </div>
        <div id="title3">
        <p id="title13"><FaTemperatureHigh /> Body Temperature</p>
        <ReactApexChart options={option3} series={[{data:tp}]} type="line" width={"100%"} height={350}/>
        </div>
      </div>
    </div>
  );
}

export default Detail;