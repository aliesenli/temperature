import { temperature, data } from './options/temperature.js';
import { humidity } from './options/humidity.js';

var socket = io();
var sensorData = [];
var chartData = data;

var temperatureChart = new ApexCharts(document.querySelector("#temperatureChart"), temperature);
temperatureChart.render();

var humidityChart = new ApexCharts(document.querySelector("#humidityChart"), humidity);
humidityChart.render();

socket.on('temperature-data', (content) => {
    sensorData.push(content);
    getNewSeries(getLastDate(), getLastTemperature())
    temperatureChart.updateSeries([{
        data: chartData
    }])
})

socket.on('humidity-data', (data) => {
    humidityChart.updateSeries(updateHumidityChart(data))
})

function getLastTemperature() {
    return sensorData.slice(-1)[0].dataset;
}

function getLastDate() {
    return sensorData.slice(-1)[0].time
}

function getNewSeries(date, yAxis) {
    var newSerie = [date, yAxis]
    chartData.push(newSerie);
}

function updateHumidityChart(data) {
    return humidityChart.w.globals.series.map(function() {
        return Math.floor(data.dataset)
    })
}