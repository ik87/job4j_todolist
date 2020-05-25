$('div[name="text"]').click( function (data) {
    $(this).prop('contenteditable',true);
}).on('keypress',function (e) {
    if(e.keyCode === 13 && e.shiftKey) {

    }else if(e.which == 13) {
        if($(this).html().length == 0) {
            $(this).html("\xa0");
        }
        $(this).prop('contenteditable',false);
    }
}).focusout(function (data) {
    if($(this).html().length == 0) {
        $(this).html("\xa0");
    }
    $(this).prop('contenteditable',false);
})

$('img[name="status"]').click(function (data) {
    if($(this).attr('src') == 'img/circle-fill.svg') {
        $(this).prop('src', 'img/circle.svg');
        $(this).next().find('div[name=text]').css("text-decoration","none");

    } else {
        $(this).prop('src', 'img/circle-fill.svg');
        $(this).next().find('div[name=text]').css("text-decoration","line-through");
    }
})