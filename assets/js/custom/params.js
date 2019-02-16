var global_params = [];

function paramRefresh() {
    var params = $("#params").serializeArray();

    params.forEach(function (element) {
        var object = {[element.name]: element.value};
        global_params.push(object);
    });

    Cookies.set("global_params", JSON.stringify(global_params));

    return false;
}

function paramInit() {
    try {
        var cookie_params = JSON.parse(Cookies.get("global_params"));

        cookie_params.forEach(function (param) {
            var key = Object.keys(param)[0];
            var value = param[key];
            console.log(key + ": " + value);
            $("#params").find("input[name='" + key + "'][value='" + value + "']").prop('checked', true);
            ;
        });
    } catch (e) {
        //Maybe first visit or nothing saved yet
    }
}

function isSummer() {
    return global_params.season === 'summer';
}