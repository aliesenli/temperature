var data = [];
var sensorData = [];
var lastDate = "";
var lastTemperature = "";
var lastHumidity = 0;

var socket = io();
    socket.on('temperature-data', (content) => {
        sensorData.push(content);
        lastTemperature = sensorData.slice(-1)[0].dataset
        lastDate = sensorData.slice(-1)[0].time
    })
    socket.on('humidity-data', (content) => {
        lastHumidity = content.dataset;
    })
    
function getNewSeries(date, yAxis) {
    var newSerie = [date, yAxis]
    data.push(newSerie);
}

var options = {
    series: [{
       name: "Temperature",
       data: data.slice()
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
        toolbar: {
        show: false
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
            text: "Time"
        },
        labels: {
            formatter: function (value) {
                return new Date(value * 1000).toLocaleTimeString();
            }
        }
    },
    yaxis: {
        opposite: true,
        title: {
            text: "Celsius"
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

var lineChart = new ApexCharts(document.querySelector("#chart"), options);
lineChart.render();

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

var humidityChart = new ApexCharts(document.querySelector("#humidityChart"), humidityOptions);
humidityChart.render();

function update() {
    return humidityChart.w.globals.series.map(function() {
        return Math.floor(lastHumidity)
    })
}

window.setInterval(function () {
getNewSeries(lastDate, lastTemperature)

lineChart.updateSeries([{
    data: data
}])

humidityChart.updateSeries(update())

}, 4010)