import { temperatureSettings } from './options/temperature.js';
import { humiditySettings } from './options/humidity.js';

const socket = io();
const chartData = [];

const temperatureChart = new ApexCharts(document.querySelector("#temperatureChart"), temperatureSettings);
const humidityChart = new ApexCharts(document.querySelector("#humidityChart"), humiditySettings);

temperatureChart.render();
humidityChart.render();

socket.on('emit-temperature', (content) => {
    chartData.push([content.timestamp, content.temperature]);
    temperatureChart.updateSeries([{
        data: chartData
    }])
})

socket.on('emit-humidity', (data) => {
    humidityChart.updateSeries([Math.floor(data.humidity)]);
})