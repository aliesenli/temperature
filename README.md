# Arduino Live Temperature/Humidity Chart
![Node.js CI](https://github.com/AliEsenli/Arduino-Temperature-Chart/workflows/Node.js%20CI/badge.svg?branch=master)

#### Simple arduino project reading temperature & humidity data and displaying live-charts
<img src="https://github.com/AliEsenli/arduino-live-temperature/blob/master/docs/temperature-chart.gif">
<img src="https://github.com/AliEsenli/arduino-live-temperature/blob/master/docs/arduino-plan.png">

In this project I used the `DHT11` temperature- and humiditysensor for measurements. Apexcharts for charting/visualizing. Data is read through Serial Port and Socket.io is used for communication between client and server (emitting temperature & humidity data to client)

#### Prerequisites
- Visual Studio Code 
- Arduino IDE
- Node.js

#### Installation
Open Arduino IDE and Upload the .ino file to your Arduino UNO. If you are using Windows, please make sure your arduino is using the `"COM3"` serial port or change it in the source code(`server.js`). For Linux, your serial port will look like this `"/dev/ttyS"`

Open Visual Studio Code, go to integrated terminal and type: 
```
npm install
```
After that you can run the server using:
```
npm start
```
Then visit `localhost:3000` in your browser (of course your Arduino has to be plugged in and running)
