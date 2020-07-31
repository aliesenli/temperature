var chartData = [];
var sensorData = [];
var socket = io();

var temperatureOptions = {
    series: [{
       name: "Temperature",
       data: chartData.slice()
    }],
        chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
            }
        },
        zoom: {
        enabled: false
        },
    },
    colors: ['#ff0340'],
    dataLabels: {
        enabled: true,
        style: {
        fontSize: '12px',
        fontWeight: 'bold'
        },
        background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        },
    },
    grid: {
        padding: {
        left: 15,
        right: 15
        }
    },
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.2,
            opacityTo: 0.8,
        }
    },
    markers: {
        size: 4
    },
    xaxis: {
        type: 'datetime',
        categories: [],
        range: 30,
        title: {
            text: "Time",
            offsetY: 10
        },
        labels: {
            rotateAlways: true,
            rotate: -30,
            offsetX: 15,
            offsetY: 10,
            formatter: function (value) {
                return new Date(value * 1000).toLocaleTimeString();
            }
        },
        axisBorder: {
            color: '#78909C'
        },
        axisTicks: {
            color: '#78909C',
        },
    },
    yaxis: {
        opposite: true,
        title: {
            text: "Celsius"
        },
        labels: {
            offsetX: -10
        }
    },
    title: {
        text: 'Temperature Chart',
        align: 'left',
        style: {
        fontSize: '14px',
        color: '#3498DB'
        }
    },
};

var humidityOptions = {
    series: [0],
    chart: {
    height: 350,
    type: 'radialBar',
    offsetY: -10
  },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: {
          fontSize: '16px',
          offsetY: 120
        },
        value: {
          offsetY: 76,
          fontSize: '22px',
          formatter: function (val) {
            return val + "%";
          }
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
        shade: 'dark',
        shadeIntensity: 0.3,
    },
  },
  stroke: {
    dashArray: 4
  },
  labels: ['Humidity / Luftfeuchtigkeit'],
  title: {
    text: 'Humidity Chart',
    align: 'left',
    style: {
       fontSize: '14px',
       color: '#3498DB'
    }
  },
};

var temperatureChart = new ApexCharts(document.querySelector("#temperatureChart"), temperatureOptions);
temperatureChart.render();

var humidityChart = new ApexCharts(document.querySelector("#humidityChart"), humidityOptions);
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
