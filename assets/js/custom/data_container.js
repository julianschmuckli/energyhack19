function randomDataArray(length) { //Random number creator
    var data = [];

    for (var i = 0; i < length; i++) {
        var current_number = Math.floor((Math.random() * 100) + 1);
        data.push(current_number);
    }

    return data;
}