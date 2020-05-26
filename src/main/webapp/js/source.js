//when write text
$('#todo').on("click", 'div[name="text"]', function (data) {
    $(this).prop('contenteditable', true);
}).on('keypress', function (e) {
    if (e.which == 13 && !e.shiftKey) {
        if ($(this).html().length == 0) {
            $(this).html("\xa0");
        }
        $(this).prop('contenteditable', false);
    }
}).on('focusout', function (data) {
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
    } else {
        li.attr('done', 'true');
    }
});

//when click on trash
$('#todo').on('click', 'div[name="trash"]', function () {
    $(this).parents()[3].remove();
});

//data = {desc: 'some text', created: '[14:34]', done: 'false'}
var data = [
    {desc: "some text1", created: "14:34", done: 'false'},
    {desc: "some text2", created: "15:24", done: 'false'},
    {desc: "some text3", created: "17:35", done: 'true'}
];

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
    return li;
}

function make(data) {
    let ul = $('#todo');
    ul.append(`<ul class="list-unstyled">`);
    for (i = 0; i < data.length; i++) {
        ul.append(task(data[i]));
    }
    ul.append(`</ul>`);
}

$('#newtask').on('click', function () {
    console.log("click");
    let date = new Date();
    let time = (date.getHours() < 10 ? '0' : '') + date.getHours() + ":"
        + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let data = {desc: '\xa0', created: time, done: 'false'}
    $('#todo').prepend(task(data));
});

make(data);


