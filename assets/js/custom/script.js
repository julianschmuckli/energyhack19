$(document).ready(function() {

    $("#open-parameters").click(function() {
        $("#parameters-content").slideToggle();
        $("#open-parameters").toggleClass("fa-rotate-180");
    });

});