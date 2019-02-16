var dayChart = undefined;

function showDayChart(labels, reference, current, optimal) {
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

    var ctx = document.getElementById("chart-reference-day").getContext('2d');
    ctx.height = 500;

    try {
        dayChart.destroy();
    } catch (e) {

    }

    dayChart = new Chart(ctx, {
        type: 'line',
        steppedline: true,
        data: {
            labels: labels, //Has to be changed to time according to timestamps
            datasets: [
                {
                    label: "Referenz Woche",
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
    $("#week_chart").slideUp();
    $("#day_chart").slideDown();
}