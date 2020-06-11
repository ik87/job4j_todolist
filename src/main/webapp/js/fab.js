//https://api.jquery.com/hover/#hover-handlerIn-handlerOut
//https://codepen.io/petja/pen/OVRYMq
//https://material.io/components/buttons-floating-action-button#theming

$(function () {
    $(".fab,.backdrop").hover(open_backdrop(), close_backdrop());

})

function open_backdrop() {
    $(".backdrop").fadeIn(125);
    $(".fab.child").each(function () {
        $(this)
            .stop()
            .show()
            .animate({
                bottom: (parseInt($("#masterfab").css("bottom")) + parseInt($("#masterfab").outerHeight()) + 70 * $(this).data("subitem") - $(".fab.child").outerHeight()) + "px",
                opacity: 1
            }, 125);
    });
}

function close_backdrop() {
    console.log("fade out")
    $(".backdrop").fadeOut(125);
    $(".fab.child")
        .stop()
        .animate({
            bottom: $("#masterfab").css("bottom"),
            opacity: 0
        }, 125, function () {
            $(this).hide();
        })
}