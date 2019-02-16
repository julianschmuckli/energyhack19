$(document).ready(function () {
    paramInit();
    initListeners();
    initWeekChart();
});

var weekChart = undefined;
var weekChart_html = undefined;

var reference = [];
var y_axis = [];

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

    //Clear canvas for data and axis update
    weekChart_html = $("#week_chart").find(".chart-container").html();
    var parent_element = $("#week_chart").find(".chart-container").parent();
    $("#week_chart").find(".chart-container").remove();
    $("#week_chart").append(weekChart_html);


    var ctx = document.getElementById("chart-reference-week").getContext('2d');
    ctx.height = 500;
    weekChart = new Chart(ctx, {
        type: 'line',
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