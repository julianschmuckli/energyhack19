$(document).ready(function () {
    initializeChart();
});

function initializeChart() {
    var ctx = document.getElementById("chart-reference-week").getContext('2d');
    ctx.height = 500;
    var chart = new Chart(ctx, {
        type: 'line',
        labels: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        data: {
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
                    data: randomDataArray(7)
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