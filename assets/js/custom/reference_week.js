$(document).ready(function () {
    paramInit();
    initListeners();
    initWeekChart();
});

var weekChart = undefined;

function showChart(labels, reference, optimal, price) {
    if (labels == undefined) {
        labels = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
    }

    if (reference == undefined) {
        reference = randomDataArray(168);
    }

    if (price == undefined) {
        //price = randomDataArray(168);
    }

    if (optimal == undefined) {
        optimal = randomDataArray(168);
    }

    var ctx = document.getElementById("chart-reference-week").getContext('2d');
    ctx.height = 500;
    weekChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, //Has to be changed to time according to timestamps
            datasets: [
                {
                    label: "Referenz-Lastgang",
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fill: false,
                    data: reference
                },
                {
                    label: "Lastgang optimiert",
                    backgroundColor: 'red',
                    borderColor: 'red',
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
    document.getElementById("chart-reference-week").onclick = function (evt) {
        var activePoints = weekChart.getElementsAtEvent(evt);
        try {
            var datapoint = reference[activePoints[0]._index]
            initDayChart(datapoint.x); //Get the date object and start init of DayChart
        } catch (e) {

        }
    };
}

function initListeners() {
    $("#back_to_week_chart").on('click', function () {
        $("#day_chart").slideUp();
        $("#week_chart").slideDown();
    });
}