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
                    label: "Optimalwert",
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fill: false,
                    data: randomDataArray(7)
                },
                {
                    label: "Soll",
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fill: false,
                    data: randomDataArray(7)
                },
                {
                    label: "Ist",
                    backgroundColor: 'yellow',
                    borderColor: 'yellow',
                    fill: false,
                    data: randomDataArray(7)
                }
            ],
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                }]
            }
        }
    });
}

function randomDataArray(length) { //Random number creator
    var data = [];

    for (var i = 0; i < length; i++) {
        var current_number = Math.floor((Math.random() * 100) + 1);
        data.push(current_number);
    }

    return data;
}