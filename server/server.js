const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const moment = require('moment')
const SerialPort = require('serialport');

app.use(express.static('client'));

const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM3'); // Port your Arduino is connected to
const parser = new Readline();
port.pipe(parser);

port.on("open", function () {
  console.log('COM3 Port opened'); 
  parser.on('data', function(data) {
    const sensorData = {
      dataset: data,
      time: moment().unix() // Unix timestamps
    }
    if(sensorData.dataset.includes("Temperature")) {
      sensorData.dataset = sensorData.dataset.replace("Temperature: ", "");
      io.emit('temperature-data', sensorData)
    } else if (sensorData.dataset.includes("Humidity")) {
      sensorData.dataset = sensorData.dataset.replace("Humidity: ", "");
      io.emit ('humidity-data', sensorData)
    }
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});