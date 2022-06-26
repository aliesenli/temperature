const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const moment = require('moment')
const SerialPort = require('serialport');

app.use(express.static('client'));

const arduinoSerialPort = 'COM3'; // The serialport your Arduino is connected to
const serialport = new SerialPort(arduinoSerialPort);
const parser = new SerialPort.parsers.Readline();

serialport.pipe(parser);

serialport.on('open', function () {
  console.log("Port opened: " + arduinoSerialPort);
  parser.on('data', function (data) {
    if (data.includes('Temperature')) {
      const temperatureData = { temperature: data.replace('Temperature: ', ''), timestamp: moment().unix() }
      io.emit('emit-temperature', temperatureData)
    } else if (data.includes('Humidity')) {
      const humidityData = { humidity: data.replace('Humidity: ', '') }
      io.emit('emit-humidity', humidityData);
    }
  });
});

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});