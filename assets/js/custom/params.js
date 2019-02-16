var global_params = [];

function paramRefresh() {
    var params = $("#params").serializeArray();

    params.forEach(function (element) {
        var object = {[element.name]: element.value};
        global_params.push(object);
    });

    Cookies.set("global_params", JSON.stringify(global_params));

    initWeekChart(true);

    location.reload(); //Sorry for that
    return false;
}

function paramInit() {
    try {
        var cookie_params = JSON.parse(Cookies.get("global_params"));
        global_params = cookie_params;

        cookie_params.forEach(function (param) {
            var key = Object.keys(param)[0];
            var value = param[key];
            console.log(key + ": " + value);
            $("#params").find("input[name='" + key + "'][value='" + value + "']").prop('checked', true);
        });
    } catch (e) {
        //Maybe first visit or nothing saved yet
    }
}

function getParamsValue(key) {
    var value = undefined;
    global_params.forEach(function (param) {
        var param_key = Object.keys(param)[0];
        if (param_key == key) {
            value = param[param_key];
        }
    });
    return value
}

function getSeason() {
    var season = undefined;
    if (getParamsValue('season') == undefined) {
        season = 'summer';
    } else {
        season = getParamsValue('season');
    }

    return season;
}