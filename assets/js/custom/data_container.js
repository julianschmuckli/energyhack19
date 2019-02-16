function randomDataArray(length) { //Random number creator
    var data = [];

    for (var i = 0; i < length; i++) {
        var current_number = Math.random();
        data.push(current_number);
    }

    return data;
}

var reference = [];
var y_axis = [];

function initWeekChart(destroy) {
    if (destroy != undefined && destroy == true) {
        weekChart.destroy();
    }

    reference = [];

    setTimeout(function () {
        var data = f_reference_data;

        data.forEach(function (current) {
            var time = new Date(current.time * 1000); //Get timestamp
            var value = current.kw; //Get kW
            reference.push({x: time, y: value});

            var formatted_time = (time.getDate() + "").padStart(2, "0") + "." + ((time.getMonth() + 1) + "").padStart(2, "0") + "." + time.getFullYear()
                + " " + (time.getHours() + "").padStart(2, "0") + ":" + (time.getMinutes() + "").padStart(2, "0");
            y_axis.push(formatted_time);
        });

        var first_date = reference[0].x;
        var end_date = reference[reference.length - 1].x;

        var formatted_first_date = (first_date.getDate() + "").padStart(2, "0") + "." + ((first_date.getMonth() + 1) + "").padStart(2, "0") + "." + first_date.getFullYear();
        var formatted_end_date = (end_date.getDate() + "").padStart(2, "0") + "." + ((end_date.getMonth() + 1) + "").padStart(2, "0") + "." + end_date.getFullYear();


        $("#chart_week_title").text(formatted_first_date + " - " + formatted_end_date);

        var optimised = calcOptimisedData(data);
        var new_optimised = [];

        optimised.forEach(function (element) {
            new_optimised.push(element / 5);
        });

        showChart(y_axis, reference, new_optimised);
    }, 1000);
}

function initDayChart(date) { //Format: Month / Day / Year
    var day = ((date.getMonth() + 1) + "").padStart(2, "0") + "/" + (date.getDate() + "").padStart(2, "0") + "/" + date.getFullYear();

    //Display title
    var formatted_day = (date.getDate() + "").padStart(2, "0") + "." + ((date.getMonth() + 1) + "").padStart(2, "0") + "." + date.getFullYear();
    $("#chart_day_title").text(formatted_day);

    var active_day = (new Date(day)).getTime() / 1000;
    var active_day_end = (new Date(day)).getTime() / 1000 + 86400;

    $.getJSON("./data/reference_" + getSeason() + ".json", function (data) {
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