$(document).ready(function () {
    initializeChart();
});

function initializeChart() {
    $.getJSON("./data/reference.json", function (data) {
        var reference = [];
        var y_axis = [];

        data.forEach(function (current) {
            var time = new Date(current.x * 1000); //Get timestamp
            var value = current.y;
            reference.push({x: time, y: value});

            var formatted_time = "";
            y_axis.push(time);
        });

        showChart(y_axis, reference);
    });
}

function showChart(labels, reference, current, optimal) {
    if (labels == undefined) {
        labels = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    }

    if (reference == undefined) {
        reference = randomDataArray(7);
    }

    if (current == undefined) {
        current = randomDataArray(7);
    }

    if (optimal == undefined) {
        optimal = randomDataArray(7);
    }

    var ctx = document.getElementById("chart-reference-week").getContext('2d');
    ctx.height = 500;
    var chart = new Chart(ctx, {
        type: 'line',
        steppedline: true,
        data: {
            labels: labels, //Has to be changed to time according to timestamps
            datasets: [
                {
                    label: "Durchschnittswert letze Periode",
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fill: false,
                    data: reference
                },
                {
                    label: "Aktuelle Woche",
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fill: false,
                    data: current
                },
                {
                    label: "Optimiert",
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    fill: false,
                    data: optimal
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