var count_done = 0;
var count_open = 0;

//when write text
$('#todo').on("click", 'div[name="text"]', function (data) {
    $(this).prop('contenteditable', true).focus();


}).on('keydown','div[name="text"]', function (e) {

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
        window.scrollTo(0,document.body.scrollHeight );
        return false;
    }
//not work yet
/*   let liPos = $(this)[0].getBoundingClientRect().bottom + $(window)['scrollTop']();
    let newtaskPos = $("#newtask")[0].getBoundingClientRect().top + $(window)['scrollTop']();
    console.log(liPos);
    console.log(newtaskPos);
    if(liPos > newtaskPos) {
        window.scrollTo(0,newtaskPos );
    }*/


}).on('focusout','div[name="text"]', function (data) {
    if ($(this).html().length == 0) {
        $(this).html("\xa0");
    }

    $(this).prop('contenteditable', false);
});

//when click on status
$('#todo').on('click', 'div[name="status"]', function () {
    let li = $(this).parent();
    let checked = $('#show_completed'). is(":checked");

    if (li.attr('done') == 'true') {
        li.attr('done', 'false');
        li.removeClass('d-none');
        li.find("div[name='completed']").html("--:--");
        $('#count_done').html(--count_done);
        $('#count_open').html(++count_open);

    } else {
        li.attr('done', 'true');
        let time = get_current_time();
        li.find("div[name='completed']").html( format_time(time));
        if(!checked) {
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
    if($(li).attr('done') == 'true') {
        $('#count_done').html(--count_done);
    } else {
        $('#count_open').html(--count_open);
    }
    li.remove();
});

//when set checkbox 'show completed tasks'
$('#show_completed').on('click', function () {
    if(!$('#show_completed'). is(":checked")){
        $('#todo li').map(function () {
            if($(this).attr('done') == 'true') {
                $(this).addClass('d-none');
            }
        })
    } else {
        $('#todo li').map(function () {
            if($(this).attr('done') == 'true') {
                $(this).removeClass('d-none');
            }
        })

    }
});


//when click "new task"
$('#newtask').on('click', function () {
    let nt = newtask();
    $('#todo ul').append(nt);
    $("#todo li:last-child div[name='text']").prop('contenteditable', true).focus();
    window.scrollTo(0,document.body.scrollHeight);

});


//when click "new todolist"
$("#newtodo").on('click', function () {
    $('#todo ul').html("");
    count_done = 0;
    count_open = 0;
    $('#count_done').html(0);
    $('#count_open').html(0);

});

//when click "new todolist"
$("#signin").on('click', function () {
    $("#signinModal").modal('show');
});

function newtask() {
    let time = get_current_time();
    let data = {desc: '\xa0', created: time, completed: "--:--", done: 'false'};
    return task(data);
}

var lastScrollTop = 0;
$(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        // downscroll code
        $('#newtask').css({ opacity: 0.1 });
    } else {
        $('#newtask').css({ opacity: 1 });
        // upscroll code
    }
    lastScrollTop = st;
});

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
    if(data.done == 'true') {
        $('#count_done').html(++count_done);
    } else {
        $('#count_open').html(++count_open);
    }
    return li;
}

function get_current_time() {
   return  moment().format();
}

function format_time(time) {
    let result = moment(time).format("HH:mm");
    if( result == "Invalid date") {
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
    {desc: "some text1", created: "2020-06-01T19:38:22+03:00", completed: "--:--", done: 'false'},
    {desc: "some text2", created: "2020-06-01T14:33:22+03:00", completed: "--:--", done: 'false'},
    {desc: "some text3", created: "2020-06-01T16:12:22+03:00", completed: "--:--", done: 'true'}
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

/*
let was_above = false;
function intersection(entries, observer) {
    entries.forEach(entry => {
        const isAbove = entry.boundingClientRect.y < entry.rootBounds.y;

        if (entry.isIntersecting) {
            if (was_above) {
                // Comes from top
            }
        }

        was_above = isAbove;
    });
}*/
