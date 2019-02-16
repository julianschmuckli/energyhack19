$(document).ready(function() {

    $("#open-parameters").click(function() {
        $("#parameters-content").slideToggle();
        $("#open-parameters").toggleClass("fa-rotate-180");
    });

});

calcPreissignal(12.49, 14.42, 0.5);

function calcPreissignal(htnt, spot, alpha) {
console.log(alpha*spot+(1-alpha)*htnt);
}

function calcjedeViert() {

    $.getJSON("./data/reference.json", function (data) {

        console.log(data.length / 4);

        var compressedToHours = [];
        var i = 0;
        data.forEach(function (kw) {
            var time = kw.x;
            var kw = kw.y;

            if(i % 4 == 0) {
                compressedToHours.push({timestamp: time, kw: kw});
            } else {
                compressedToHours[compressedToHours.length - 1].kw += kw;
            }
            i++;
        });
        console.log(compressedToHours);
    });
}
calcjedeViert();

/*
var HTNT;
var SPOT;
var faktor = 1;
var reduzierterPreis;

$.getJSON("./data/pricecalculate.json", function (data) {

    data.forEach(function (price) {
        HTNT = price.rpkwh;
        SPOT = price.brkpwh;
    });

    $.getJSON("./data/reference.json", function (data) {

        data.forEach(function (kw) {
            var time = kw.x;
            var kw = kw.y;

            console.log(HTNT, SPOT, time, kw, faktor);



            reduzierterPreis = faktor * SPOT + (1-faktor)*(kw*HTNT);
            console.log(reduzierterPreis);

        });
    });
});*/