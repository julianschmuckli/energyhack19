var global_params = [];

function paramRefresh() {
    var params = $("#params").serializeArray();

    params.forEach(function (element) {
        var object = {[element.name]: element.value};
        global_params.push(object);
    });

    return false;
}