function initDayChart(date) { //Format: Month / Day / Year
    var day = ((date.getMonth() + 1) + "").padStart(2, "0") + "/" + (date.getDate() + "").padStart(2, "0") + "/" + date.getFullYear();

    //Display title
    var formatted_day = (date.getDate() + "").padStart(2, "0") + "." + ((date.getMonth() + 1) + "").padStart(2, "0") + "." + date.getFullYear();
    $("#chart_day_title").text(formatted_day);

    var active_day = (new Date(day)).getTime() / 1000;
    var active_day_end = (new Date(day)).getTime() / 1000 + 86400;

    $.getJSON("./data/reference.json", function (data) {
        var reference = [];
        var y_axis = [];

        data.forEach(function (current) {
            //console.log(current.time + " - " + active_day + " - " + active_day_end);
            if (current.time >= active_day && current.time < active_day_end) {
                var time = new Date(current.time * 1000); //Get timestamp
                var value = current.kw; //Get kWh
                reference.push({x: time, y: value});

                var formatted_time = (time.getHours() + "").padStart(2, "0") + ":" + (time.getMinutes() + "").padStart(2, "0");
                y_axis.push(formatted_time);
            }
        });

        showDayChart(y_axis, reference);
    });
}

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