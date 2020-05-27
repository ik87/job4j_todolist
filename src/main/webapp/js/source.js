var count_done = 0;
var count_open = 0;

//when write text
$('#todo').on("click", 'div[name="text"]', function (data) {
    $(this).prop('contenteditable', true);
}).on('keypress','div[name="text"]', function (e) {
    if (e.which == 13 && !e.shiftKey) {
        console.log('type');
        if ($(this).html().length == 0) {
            $(this).html("\xa0");
        }
        $(this).prop('contenteditable', false);
    }
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
        $('#count_done').html(--count_done);
        $('#count_open').html(++count_open);

    } else {
        li.attr('done', 'true');
        console.log(checked);
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
    console.log("click");
    let date = new Date();
    let time = (date.getHours() < 10 ? '0' : '') + date.getHours() + ":"
        + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let data = {desc: '\xa0', created: time, done: 'false'}
    $('#todo').prepend(task(data));
});

//create new task
function task(data) {
    let li = `<li class="media mt-3" done="${data.done}">
                    <div name="status"></div>
                    <div class="media-body">
                        <div name="text">${data.desc}</div>
                        <div>
                            <hr class="my-1">
                            <div class="row justify-content-end">
                                <div name="time" >[${data.created}]</div>
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

function make_todolist(data) {
    let ul = $('#todo');
    ul.append(`<ul class="list-unstyled">`);
    for (i = 0; i < data.length; i++) {
        ul.append(task(data[i]));
    }
    ul.append(`</ul>`);
}



//data = {desc: 'some text', created: '[14:34]', done: 'false'}
var data = [
    {desc: "some text1", created: "14:34", done: 'false'},
    {desc: "some text2", created: "15:24", done: 'false'},
    {desc: "some text3", created: "17:35", done: 'true'}
];


make_todolist(data);


