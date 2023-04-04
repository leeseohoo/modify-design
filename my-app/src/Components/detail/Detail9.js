import React from "react";
import { useEffect, useState } from "react";
import "./styles.css";

let user9_hr = 0;
let user9_rp = 0;
let user9_tp = 0;
const str = 'user9';

const PADDING = 20;
const MAX_VALUE = 110;
const Y_TICK = 4;
const DURATION = 1000 * 20; // *30->2초에 한번, *10->1초에 한번
const EX_TIME = "00:00";

function LineChart1({ id }) {
  let post1 = user9_hr;
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
  let post2 = user9_rp;
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
  let post3 = user9_tp;
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

const Detail = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    const WebSocket = require('ws');

    const socket = new window.WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      setMessage(event.data);
      
      let parse_data = JSON.parse(event.data)
      let ur = parse_data.user
      let hr = parse_data.heartrate
      let rp = parse_data.resp
      let tp = parse_data.temp
      
      if (ur===str){
        console.log('ur: '+ur)
        console.log('hr: '+hr)
        console.log('rp: '+rp)
        console.log('tp: '+tp)
        user9_hr=hr;
        user9_rp=rp;
        user9_tp=tp;
        // console.log(message + "수신");
      }
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
    </div>
  );
}

export default Detail;