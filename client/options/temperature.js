var data = [];

var temperature = {
    series: [{
       name: "Temperature",
       data: data
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

export { temperature, data };
