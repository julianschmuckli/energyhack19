function randomDataArray(length) { //Random number creator
    var data = [];

    for (var i = 0; i < length; i++) {
        var current_number = Math.random();
        data.push(current_number);
    }

    return data;
}