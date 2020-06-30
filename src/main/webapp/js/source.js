var count_done = 0;
var count_open = 0;
var show_completed = true;
//when write text
$('#todo').on("click", 'div[name="text"]', function (data) {
    $(this).prop('contenteditable', true).focus();
}).on('keydown', 'div[name="text"]', function (e) {

    if (e.which == 13 && !e.shiftKey) {
        if ($(this).html().length == 0) {
            $(this).html("\xa0");
        }
        $(this).prop('contenteditable', false);
        let nt = newtask();
        let li = $(this).parents('li');
        console.log(li)
        li.after(nt);
        $(li.next(li)).find('div[name="text"]')
            .prop('contenteditable', true).focus();
        window.scrollTo(0, document.body.scrollHeight);
        return false;
    }

}).on('focusout', 'div[name="text"]', function (data) {
    if ($(this).html().length == 0) {
        $(this).html("\xa0");
    }

    $(this).prop('contenteditable', false);
});

//when click on status
$('#todo').on('click', 'div[name="status"]', function () {
    let li = $(this).parent();

    if (li.attr('done') == 'true') {
        li.attr('done', 'false');
        li.removeClass('d-none');
        li.find("div[name='completed']").html("--:--");
        $('#count_done').html(--count_done);
        $('#count_open').html(++count_open);

    } else {
        li.attr('done', 'true');
        let time = get_current_time();
        li.find("div[name='completed']").html(format_time(time));
        if (!show_completed) {
            li.addClass('d-none');
        }
        $('#count_done').html(++count_done);
        $('#count_open').html(--count_open);
    }

});

//when click on trash
$('#todo').on('click', 'div[name="trash"]', function () {
    let li = $(this).parents()[3];
    console.log(li);
    if ($(li).attr('done') == 'true') {
        $('#count_done').html(--count_done);
    } else {
        $('#count_open').html(--count_open);
    }
    li.remove();
    show_nav();
});

//when set checkbox 'show completed tasks'
$('#show_completed').on('click', function () {
    show_completed = !show_completed;

    if (!show_completed) {
        $('#todo li').map(function () {
            if ($(this).attr('done') == 'true') {
                $(this).addClass('d-none');
            }
        })
        $('#show_completed').attr('src', 'img/lp2.svg');
    } else {
        $('#todo li').map(function () {
            if ($(this).attr('done') == 'true') {
                $(this).removeClass('d-none');
            }
        })
        $('#show_completed').attr('src', 'img/lp_on2.svg');
    }
});


//when click "new task"
$('#newtask').on('click', function () {
    let nt = newtask();
    $('#todo ul').append(nt);
    $("#todo li:last-child div[name='text']").prop('contenteditable', true).focus();
    window.scrollTo(0, document.body.scrollHeight);


});


//when click "new todolist"
$("#newtodo").on('click', async function () {
    $('#todo ul').html("");
    count_done = 0;
    count_open = 0;
    $('#count_done').html(0);
    $('#count_open').html(0);
    await new Promise(r => setTimeout(show_nav, 300));

});

//when click "sign in"
$("#signin").on('click', function () {
    $("#signinModal").modal('show');
    show_nav();
});

//when click "history"
$("#histroy").on('click', function () {
    $("#histroyModal").modal('show');
    show_nav();
});

function newtask() {
    let time = get_current_time();
    let data = {desc: '\xa0', created: time, completed: "--:--", done: 'false'};
    return task(data);
}

//when scroll
var last_scroll_top = 0;
$(window).scroll(function (event) {
    var st = $(this).scrollTop();
    if (st > last_scroll_top) {
        // downscroll code
        show_nav();
    } else {
        hide_nav();
        // upscroll code
    }
    last_scroll_top = st;
});


function show_nav() {
    $('#bottom_nav').css({bottom: "0px"});
    $('#newtask').css({bottom: "-25px"});

}

function hide_nav() {
    $('#newtask').css({bottom: "-100px"});
    $('#bottom_nav').css({bottom: "-100px"});
}

//create new task
function task(data) {
    let li = `<li class="media mt-3" done="${data.done}">
                    <div name="status"></div>
                    <div class="media-body">
                        <div name="text">${data.desc}</div>
                        <div>
                            <hr class="my-1 border-white">
                            <div class="row justify-content-end">
                                <div name="created" >${format_time(data.created)} → </div>
                                &nbsp;<div name="completed" >${format_time(data.completed)}</div>
                                <div name="trash" ></div>
                            </div>
                        </div>
                    </div>
                </li>`;
    if (data.done == 'true') {
        $('#count_done').html(++count_done);
    } else {
        $('#count_open').html(++count_open);
    }
    return li;
}




function get_current_time() {
    return moment().format();
}

function format_time(time) {
    let result = moment(time).format("HH:mm");
    if (result == "Invalid date") {
        result = "--:--"
    }
    return result;
}

function make_todolist(data) {
    let div = $('#todo');
    div.html(`<ul class="list-unstyled"></ul>`);
    let ul = div.find('ul');
    for (i = 0; i < data.length; i++) {
        ul.append(task(data[i]));
    }
}



//data = {desc: 'some text', created: '[14:34]', done: 'false'}
var data = [
    {desc: "some text1", created: "2020-06-20T19:38:22+03:00", completed: "--:--", done: 'false'},
    {desc: "some text2", created: "2020-06-20T14:33:22+03:00", completed: "--:--", done: 'false'},
    {desc: "some text3", created: "2020-06-20T16:12:22+03:00", completed: "2020-06-20T17:12:22+03:00", done: 'true'}
];




make_todolist(data);

$(function () {
    $('input, select').on('focus', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
    });
    $('input, select').on('blur', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
    });
})

