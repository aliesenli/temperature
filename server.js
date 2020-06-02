var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const moment = require('moment')
const SerialPort = require('serialport');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');

  const Readline = SerialPort.parsers.Readline;
  const port = new SerialPort('COM3');
  const parser = new Readline();
  
  port.pipe(parser);
  
  port.on("open", function () {
    console.log('COM3 Port opened');
    parser.on('data', function(data) {
      const sensorData = {
        dataset: data,
        time: moment().unix()//moment().format('HH:mm:ss')
      }
      
      io.emit('temperature-data', sensorData)
    });
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

