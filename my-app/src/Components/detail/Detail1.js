import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";
import arrayData from "./arrayData";
import WebSocket, {WebSocketServer} from "ws";
import ApexChart from 'apexcharts'

let user1_hr = 0;
let user1_rp = 0;
let user1_tp = 0;
const str = 'one';

const PADDING = 20;
const MAX_VALUE = 110;
const Y_TICK = 4;
const DURATION = 1000 * 20; // *30->2초에 한번, *10->1초에 한번
const EX_TIME = "00:00";

function LineChart1({ id }) {
  let post1 = user1_hr;
  const [data, setData] = useState([[Date.now(), post1]]);  

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const chartWidth = canvasWidth - PADDING;
    const chartHeight = canvasHeight - PADDING;
    const xFormatWidth = ctx.measureText(EX_TIME).width;
    let endTime, startTime, xTimeInterval;

    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }

      xTimeInterval = timeInterval;
    };

    const setTime = () => {
      endTime = Date.now();
      startTime = endTime - DURATION;
      setXInterval();
    };

    const drawChart = () => {
      setTime();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.beginPath();
      ctx.moveTo(PADDING, PADDING);
      // draw Y axis
      ctx.lineTo(PADDING, chartHeight);
      const yInterval = MAX_VALUE / Y_TICK;
      ctx.textAlign = "right";
      ctx.textBaseLine = "middle";
      for (let i = 0; i <= Y_TICK; i++) {
        const value = yInterval * i;
        const YPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);
        ctx.fillText(value, PADDING-2, YPoint); // 간격 3px
      }

      // draw X axis
      ctx.lineTo(chartWidth, chartHeight);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.rect(PADDING, 0, chartWidth, canvasHeight);
      ctx.clip();

      let currentTime = startTime - (startTime % xTimeInterval);
      ctx.textBaseLine = "top";
      ctx.textAlign = "center";
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();

        ctx.fillText(text, xPoint, chartHeight + PADDING);
        currentTime += xTimeInterval;
      }

      // draw data
      ctx.beginPath();
      data.forEach((datum, index) => {
        const [time, value] = datum;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);

        if (!index) {
          ctx.moveTo(xPoint, yPoint);
          ctx.strokeStyle='rgb(255,0,0)'
        } else {
          ctx.lineTo(xPoint, yPoint);
          ctx.strokeStyle='rgb(255,0,0)'
        }
      });
      ctx.stroke();
      ctx.restore();
      window.requestAnimationFrame(drawChart);
    };

    const tick = () => {
      return setTimeout(() => {
        const before = data.length >= 30 ? data.slice(1) : data.slice();
        setData([...before, [Date.now(), post1]]);
        
        // console.log(data);
      }, 1000);
    };
    drawChart();
    tick();

    return () => clearTimeout(tick);
  }, [data]);

  return (
    <canvas id={id} width="420px" height="300px">Heart Rate</canvas>
  );
}

function LineChart2({ id }) {
  let post2 = user1_rp;
  const [data, setData] = useState([[Date.now(), post2]]);  

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const chartWidth = canvasWidth - PADDING;
    const chartHeight = canvasHeight - PADDING;
    const xFormatWidth = ctx.measureText(EX_TIME).width;
    let endTime, startTime, xTimeInterval;

    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }

      xTimeInterval = timeInterval;
    };

    const setTime = () => {
      endTime = Date.now();
      startTime = endTime - DURATION;
      setXInterval();
    };

    const drawChart = () => {
      setTime();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.beginPath();
      ctx.moveTo(PADDING, PADDING);
      // draw Y axis
      ctx.lineTo(PADDING, chartHeight);
      const yInterval = MAX_VALUE / Y_TICK;
      ctx.textAlign = "right";
      ctx.textBaseLine = "middle";
      for (let i = 0; i <= Y_TICK; i++) {
        const value = yInterval * i;
        const YPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);
        ctx.fillText(value, PADDING-2, YPoint); // 간격 3px
      }

      // draw X axis
      ctx.lineTo(chartWidth, chartHeight);
      ctx.stroke();
      ctx.save();
      ctx.beginPath();
      ctx.rect(PADDING, 0, chartWidth, canvasHeight);
      ctx.clip();

      let currentTime = startTime - (startTime % xTimeInterval);
      ctx.textBaseLine = "top";
      ctx.textAlign = "center";
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();

        ctx.fillText(text, xPoint, chartHeight + PADDING);
        currentTime += xTimeInterval;
      }

      // draw data
      ctx.beginPath();
      data.forEach((datum, index) => {
        const [time, value] = datum;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);

        if (!index) {
          ctx.moveTo(xPoint, yPoint);
          ctx.strokeStyle='rgb(0,128,0)'
        } else {
          ctx.lineTo(xPoint, yPoint);
          ctx.strokeStyle='rgb(0,128,0)'
        }
      });
      ctx.stroke();
      ctx.restore();
      window.requestAnimationFrame(drawChart);
    };

    const tick = () => {
      return setTimeout(() => {
        const before = data.length >= 30 ? data.slice(1) : data.slice();
        setData([...before, [Date.now(), post2]]);
        
        // console.log(data);
      }, 1000);
    };
    drawChart();
    tick();

    return () => clearTimeout(tick);
  }, [data]);

  return (
    <canvas id={id} width="420px" height="300px"></canvas>
  );
}

function LineChart3({ id }) {
  let post3 = user1_tp;
  const [data, setData] = useState([[Date.now(), post3]]);  

  useEffect(() => {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    const chartWidth = canvasWidth - PADDING;
    const chartHeight = canvasHeight - PADDING;
    const xFormatWidth = ctx.measureText(EX_TIME).width;
    let endTime, startTime, xTimeInterval;

    const setXInterval = () => {
      let xPoint = 0;
      let timeInterval = 1000;
      while (true) {
        xPoint = (timeInterval / DURATION) * chartWidth;
        if (xPoint > xFormatWidth) break;
        timeInterval *= 2;
      }

      xTimeInterval = timeInterval;
    };

    const setTime = () => {
      endTime = Date.now();
      startTime = endTime - DURATION;
      setXInterval();
    };

    const drawChart = () => {
      setTime();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.beginPath();
      ctx.moveTo(PADDING, PADDING);
      // draw Y axis
      ctx.lineTo(PADDING, chartHeight);
      const yInterval = MAX_VALUE / Y_TICK;
      ctx.textAlign = "right";
      ctx.textBaseLine = "middle";
      for (let i = 0; i <= Y_TICK; i++) {
        const value = yInterval * i;
        const YPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);
        ctx.fillText(value, PADDING-2, YPoint); // 간격 3px
      }

      // draw X axis
      ctx.lineTo(chartWidth, chartHeight);
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.rect(PADDING, 0, chartWidth, canvasHeight);
      ctx.clip();

      let currentTime = startTime - (startTime % xTimeInterval);
      ctx.textBaseLine = "top";
      ctx.textAlign = "center";
      while (currentTime < endTime + xTimeInterval) {
        const xPoint = ((currentTime - startTime) / DURATION) * chartWidth;
        const date = new Date(currentTime);
        const text = date.getMinutes() + ":" + date.getSeconds();

        ctx.fillText(text, xPoint, chartHeight + PADDING);
        currentTime += xTimeInterval;
      }

      // draw data
      ctx.beginPath();
      data.forEach((datum, index) => {
        const [time, value] = datum;
        const xPoint = ((time - startTime) / DURATION) * chartWidth;
        const yPoint =
          chartHeight - (value / MAX_VALUE) * (chartHeight - PADDING);

        if (!index) {
          ctx.moveTo(xPoint, yPoint);
          ctx.strokeStyle='rgb(0,0,255)'
        } else {
          ctx.lineTo(xPoint, yPoint);
          ctx.strokeStyle='rgb(0,0,255)'
        }
      });
      ctx.stroke();
      ctx.restore();
      window.requestAnimationFrame(drawChart);
    };

    const tick = () => {
      return setTimeout(() => {
        const before = data.length >= 30 ? data.slice(1) : data.slice();
        setData([...before, [Date.now(), post3]]);
        
        // console.log(data);
      }, 1000);
    };
    drawChart();
    tick();

    return () => clearTimeout(tick);
  }, [data]);

  return (
    <canvas id={id} width="420px" height="300px"></canvas>
  );
}

// 심박수 : 60 ~ 100 beats
// 호흡수 : 1분에 12 ~ 20회
function Getdata1() {  
  var options = {
    series: [{
      name: "Respiration Rate",
      data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
    },
    {
      name: "Body Temperature",
      data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
    },
    {
      name: 'Heart Rate',
      data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
    }
  ],
    chart: {
    height: 400,
    type: 'line',
    zoom: {
      enabled: false
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    width: [5, 7, 5],
    curve: 'straight',
    dashArray: [0, 8, 5]
  },
  title: {
    text: 'Vital Signal',
    align: 'left'
  },
  legend: {
    tooltipHoverFormatter: function(val, opts) {
      return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
    }
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6
    }
  },
  xaxis: {
    categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
      '10 Jan', '11 Jan', '12 Jan'
    ],
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val + " (mins)"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val + " per session"
          }
        }
      },
      {
        title: {
          formatter: function (val) {
            return val;
          }
        }
      }
    ]
  },
  grid: {
    borderColor: '#f1f1f1',
  }
  };

  var chart = new ApexChart(document.querySelector("#chart"), options);
  chart.render();


  return (
    <div id="chart"></div>
  );
}

function Getdata2() {

  return (
    <div id="chart2"></div>
  );
}

const Detail = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    const WebSocket = require('ws');

    const socket = new window.WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      setMessage(event.data);
      
      // let parse_data = JSON.parse(event.data)
      // let ur = parse_data.user
      // let hr = parse_data.heartrate
      // let rp = parse_data.resp
      // let tp = parse_data.temp


      const arr1 = event.data.split(",")


      let timestamp = arr1[0]
      let batteryLv = arr1[2]
      let hr = arr1[3]
      let rp = arr1[5]
      let tp = arr1[4]
      let ur = arr1[9]

      let t = 0
      bar.style.width = 0
      const barAnimation = setInterval(() => {
        bar.style.width =  t + '%'
        t++ >= batteryLv && clearInterval(barAnimation)
      }, 1000)
      
      // if (ur===str){
        console.log('timestamp: '+timestamp)
        console.log('batteryLv: '+batteryLv)
        console.log('ur: '+ur)
        console.log('hr: '+hr)
        console.log('rp: '+rp)
        console.log('tp: '+tp)
        user1_hr=hr;
        user1_rp=rp;
        user1_tp=tp;
        // console.log(message + "수신");
      // }
    };

    return () => {
      if(socket.readyState===1){
        socket.close();
      }
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMessage(getData());

  // }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  

  return (
    <div className="detail">
      {/* {<Getdata1 id="apexchart" />}  */}
      {/* <ApexChart/> */}

      <p>{message}</p>
      <div id="parent">
        <div id="title1"><p id="title11">Heart Rate</p><br/>
        {<LineChart1 className="chart" id="HR_lineChart" />}
        </div>
        <div id="title2"><p id="title12">Respiration Rate</p><br/>
        {<LineChart2 className="chart" id="RR_lineChart" />}
        </div>
        <div id="title3"><p id="title13">Body Temperature</p><br/>
        {<LineChart3 className="chart" id="BT_lineChart" />}
        </div>
      </div>
      {/* <p className="signal">Heart Rate</p>
      <p className="signal">Respiration Rate</p>
      <p className="signal">Body Temperature</p> */}
    </div>
  );
}

export default Detail;