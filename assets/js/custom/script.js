$(document).ready(function () {

    $("#open-parameters").click(function () {
        $("#parameters-content").slideToggle();
        $("#open-parameters").toggleClass("fa-rotate-180");
    });

    $(".dropdown-item").click(function () {
        $($(".dropdown-toggle", $(this).parents()[1])[0]).html($(this).html());
        calculateBetaValue();
    });

    $("#alpha-input").change(function () {
        selectedAlpha = $("#alpha-input").val();
    });

    saveFiles();
});

var f_pricecalculate;
var f_reference_data;

function saveFiles() {
    $.getJSON("./data/pricecalculate.json", function (dataPrice) {
        f_pricecalculate = dataPrice;
    });

    $.getJSON("./data/reference_" + getSeason() + ".json", function (data) {
        f_reference_data = data;
    });
}


function getValueConverted(val) {
    if (val == "Klein") return 1;
    if (val == "Mittel") return 2;
    if (val == "Gross") return 3;
    return 0;
}

var beta_values = [
    [0.0, 0.1, 0.2, 0.3],
    [0.2, 0.3, 0.4, 0.6],
    [0.4, 0.6, 0.7, 0.8],
    [0.7, 0.8, 0.9, 1.0],
];

var selectedAlpha = 0.5;
var beta = 0.0;

function calculateBetaValue() {
    var verbrauch = $("#verbrauchDropDown").html();
    var batterie = $("#batterieDropDown").html();

    console.log(beta_values[getValueConverted(verbrauch)][getValueConverted(batterie)]);
    beta = (beta_values[getValueConverted(verbrauch)][getValueConverted(batterie)]);

}


//calcPreissignal(12.49, 14.42, 0.5);

function calcPreissignal(htnt, spot, alpha) {
//console.log(alpha*spot+(1-alpha)*htnt);
    return alpha * spot + (1 - alpha) * htnt;
}

var preisMitAlpha = [];

/*$.getJSON("./data/pricecalculate.json", function (dataPrice) {

    var time = 0;
    var kw = 0;
    var kwVerbraucht = []
    var preissignal;
    var faktor = 0.3;
    var normalpris;
    var prisMitFaktor;
    var kwPreisHTNT = [];
    var kwPreisPreissignal = [];
    //console.log(kwVerbraucht);
    //console.log(data);

    $.getJSON("./data/reference.json", function (data) {
        kwVerbraucht = calcjedeViert(data);

        dataPrice.forEach(function (price) {
            var htnt = price.rpkwh;
            var spot = price.brkpwh;
            //console.log(htnt);

            //console.log(faktor * spot + (1-faktor)*htnt)
            preissignal = calcPreissignal(htnt, spot, faktor);

            for (var i = 0; i < kwVerbraucht.length; i++) {
                //console.log(price.rpkwh);
                //console.log(kwVerbraucht[i]['kw'] * htnt);
                normalpris = kwVerbraucht[i]['kw'] * htnt;
                prisMitFaktor = kwVerbraucht[i]['kw'] * preissignal;
                //console.log("pris mit htnt bi verbruch vo "+kwVerbraucht[i]['kw']+" chosted: "+ normalpris);
                //console.log("pris mit mit faktor vo "+ faktor + "bi verbruch vo "+kwVerbraucht[i]['kw']+" chosted: "+ prisMitFaktor);
                kwPreisHTNT.push(normalpris);
                kwPreisPreissignal.push(prisMitFaktor);
                preisMitAlpha = kwPreisPreissignal;

            }

        });

    });


});*/

var delta = undefined;

function calcDelta() {
    var data = f_reference_data;
    var preissignal = 0;
    var standartAbweichung = 0;
    var delta = [];

    var dataPrice = f_pricecalculate;

    dataPrice.forEach(function (price) {
        var htnt = price.rpkwh;
        var spot = price.brkpwh;

        var sum = 0;

        for (var i = 0; i < data.length; i++) {
            sum += data[i].kw; //don't forget to add the base
        }
        var avg = sum / data.length;

        preissignal = calcPreissignal(htnt, spot, 0.5);

        delta.push((preissignal - avg) / stabw(data) / 5);

    });

    return delta;
}


var stabw = function (arrayS) {
    var len = 0;
    var sum = arrayS.reduce(function (pv, cv) {
        ++len;
        return pv + cv.kw;
    }, 0);
    var mean = sum / len;
    var result = 0;
    for (var i = 0; i < len; i++)
        result += Math.pow(arrayS[i].kw - mean, 2);
    len = (len == 1) ? len : len - 1;
    return Math.sqrt(result / len);
}


/*function getSpotArray() {
    var spotArray = [];
    $.getJSON("./data/pricecalculate.json", function (dataPrice) {
        dataPrice.forEach(function (price) {
            spotArray.push(price.brkpwh);
        });
    });
    return spotArray;
}*/

function calcOptimierterLastgang(faktor, delta, referenz) {

    var oLastgang = [];

    for (var i = 0; i < delta.length; i++) {
        oLastgang.push((referenz[i].kw - faktor) * delta[i]);
    }

    return oLastgang
}


function calcOptimisedData(data) {
    //console.log(data);
    var compressedToDays = [];
    var optimisedSevenDays = [];
    var optimisedData = [];

    var c = 0;

    for (var d = 0; d < 7; d++) {
        compressedToDays.push([]);
        for (var h = 0; h < 24; h++) {
            compressedToDays[d].push(data[c])
            c++;
        }
    }

    var delta = calcDelta();
    for (var u = 0; u < 7; u++) {
        var day = [];
        day = calcOptimierterLastgang(beta, delta, compressedToDays[u]);
        optimisedSevenDays[u] = day;
    }

    for (var d = 0; d < 7; d++) {
        for (var h = 0; h < 24; h++) {
            optimisedData.push(optimisedSevenDays[d][h]);
        }
    }

    //console.log(compressedToDays);
    console.log(optimisedData);
    return optimisedData;
}


/*function getReferenceData() {
    var summerData = [];
    var winterData = [];
    if (getSeason() === "summer") {
        $.getJSON("./data/reference_summer.json", function (refSummer) {
            refSummer.forEach(function (data) {
                summerData.push(data.kw);
            });
        });
        return summerData;

    } else {
        $.getJSON("./data/reference_winter.json", function (refWinter) {
            refWinter.forEach(function (data) {
                winterData.push(data.kw);
            });
        });
        return winterData;
    }
}*/



