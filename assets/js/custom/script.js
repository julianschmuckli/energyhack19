$(document).ready(function() {

    $("#open-parameters").click(function() {
        $("#parameters-content").slideToggle();
        $("#open-parameters").toggleClass("fa-rotate-180");
    });

    $(".dropdown-item").click(function() {
        $($(".dropdown-toggle", $(this).parents()[1])[0]).html($(this).html());
        calculateBetaValue();
    });
});


function getValueConverted(val) {
    if(val == "Klein") return 1;
    if(val == "Mittel") return 2;
    if(val == "Gross") return 3;
    return 0;
}

var beta_values = [
  [0.0, 0.1, 0.2, 0.3],
  [0.2, 0.3, 0.4, 0.6],
  [0.4, 0.6, 0.7, 0.8],
  [0.7, 0.8, 0.9, 1.0],
];

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
return alpha*spot+(1-alpha)*htnt;
}

function calcjedeViert(data) {

        //console.log(data.length / 4);

        var compressedToHours = [];
        var i = 0;
        data.forEach(function (kw) {
            var time = kw.time;
            var kw = kw.kw;

            if(i % 4 == 0) {
                compressedToHours.push({timestamp: time, kw: kw});
            } else {
                compressedToHours[compressedToHours.length - 1].kw += kw;
            }
            i++;
        });
        //console.log(compressedToHours);
        return compressedToHours;
}

$.getJSON("./data/pricecalculate.json", function (dataPrice) {

    var time = 0;
    var kw = 0;
    var kwVerbraucht = []
    var preissignal;
    var faktor = 0.3;
    var normalpris;
    var prisMitFaktor;
    //console.log(kwVerbraucht);
    //console.log(data);

    $.getJSON("./data/reference.json", function (data) {
        kwVerbraucht = calcjedeViert(data);

        dataPrice.forEach(function (price) {
            var htnt = price.rpkwh;
            var spot = price.brkpwh;
           // console.log(htnt);

            //console.log(faktor * spot + (1-faktor)*htnt)
            preissignal = calcPreissignal(htnt, spot, faktor);

            for(var i = 0; i<kwVerbraucht.length; i++){
                //console.log(price.rpkwh);
                //console.log(kwVerbraucht[i]['kw'] * htnt);
                normalpris = kwVerbraucht[i]['kw'] * htnt;
                prisMitFaktor = kwVerbraucht[i]['kw'] * preissignal;
              //  console.log("pris mit htnt bi verbruch vo "+kwVerbraucht[i]['kw']+" chosted: "+ normalpris);
              //  console.log("pris mit mit faktor vo "+ faktor + "bi verbruch vo "+kwVerbraucht[i]['kw']+" chosted: "+ prisMitFaktor);

            }

        });
    });



});