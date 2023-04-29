// import WebSocket, { WebSocketServer } from "ws";
// const { Server } = require('http');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port:8080 });

let data = '';

wss.on('connection', ws => {
    ws.on('message', msg => {
        console.log("receive from client: ", JSON.parse(msg))
        ws.send("send to client: echo ", JSON.parse(msg)) // python 으로 데이터 보낸다, python에서 data 변수에 들어감
        // console.log("receive from client: ", msg)
        // ws.send("send to client: echo " + msg)
        
        data = msg;
        // wss.clients.forEach((client) => {
        //     if (client.readyState === WebSocket.OPEN) {
        //         client.send(data);
        //     }
        // })
    
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    
    });
    ws.on('close', ()=> {
        console.log('disconnected');
    });

});

// module.exports={
//     getData: () => data,  
//     //parsedata, ur, hr, rp, tp,
// };
// const getData = () => {
//     data;
// }

// export default getData;