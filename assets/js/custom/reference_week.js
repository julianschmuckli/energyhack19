$(document).ready(function () {
    initializeChart();
});

function initializeChart() {
    var ctx = document.getElementById("chart-reference-week").getContext('2d');
    ctx.height = 500;
    var chart = new Chart(ctx, {
        type: 'line',
        steppedline: true,
        data: {
            labels: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"], //Has to be changed to time according to timestamps
            datasets: [
                {
                    label: "Durchschnittswert letze Periode",
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fill: false,
                    data: randomDataArray(7)
                },
                {
                    label: "Aktuelle Woche",
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fill: false,
                    data: [70, 50, 20, 80, 20, 90, 30]
                },
                {
                    label: "Optimiert",
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    fill: false,
                    data: randomDataArray(7)
                }
            ],
        },

        options: {
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }]
            }
        }
    });
}