//get tasks
function history_table(data) {
    let table = `<table class="table table-bordered table-dark">
                    <thead>
                    <tr class="bg-success">
                        <th scope="col" colspan="2" class="col-md-11">${format_date(data.created)}</th>
                        <th scope="col" class="col-md-1"><input type="checkbox"></th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    </table>`
    return table;
}

function format_date(date) {
    return moment(date).format("DD.MM.YYYY");
}

function history_tr(data) {
    let tr =
        `<tr done="${data.done}">
    <th scope="row"><div></div></th>
    <td>${data.desc}</td>
    <td><input type="checkbox"></td>
    </tr>`
    return tr;
}

function make_history_todolist(data) {
    let div = $('#histroy_todo');
    for (i = 0; i < data.length; i++) {
        div.append(history_table(data[i][0]));
        let tbody = div.find("tbody");
        for (j = 0; j < data[i].length; j++) {
            tbody.append(history_tr(data[i][j]));
        }
    }
}

//when click on general checkbox
$("#histroy_todo").on('change', 'thead input[type=checkbox]', function() {
    if(this.checked) {
        selectAll(this, true);
    } else {
        selectAll(this, false);
    }
});

function selectAll(parent, flag) {
    let tr = $(parent).closest('table').children('tbody').children('tr');
    for(i = 0 ; i < tr.length; i++) {
        $(tr[i]).find('input').prop('checked', flag);
    }
}
//test data
var lastTodo = [
    [
        {desc: "some text1", created: "2020-06-19T19:38:22+03:00", completed: "--:--", done: 'false'},
        {
            desc: "some text2",
            created: "2020-06-19T14:33:22+03:00",
            completed: "2020-06-19T15:33:22+03:00",
            done: 'true'
        },
        {
            desc: "some text2",
            created: "2020-06-19T14:33:22+03:00",
            completed: "2020-06-19T15:33:22+03:00",
            done: 'true'
        },
        {
            desc: "some text2",
            created: "2020-06-18T14:33:22+03:00",
            completed: "2020-06-18T15:33:22+03:00",
            done: 'true'
        },
        {
            desc: "some text2",
            created: "2020-06-18T14:33:22+03:00",
            completed: "2020-06-18T15:33:22+03:00",
            done: 'true'
        },
        {
            desc: "some text2",
            created: "2020-06-18T14:33:22+03:00",
            completed: "2020-06-18T15:33:22+03:00",
            done: 'true'
        },
        {desc: "some text2", created: "2020-06-18T14:33:22+03:00", completed: "--:--", done: 'false'},
        {desc: "some text2", created: "2020-06-18T14:33:22+03:00", completed: "--:--", done: 'false'},
    ], [
        {desc: "some text2", created: "2020-06-17T14:33:22+03:00", completed: "--:--", done: 'false'},
        {
            desc: "some text2 some text2some text2some text2some text2some text2",
            created: "2020-06-17T14:33:22+03:00",
            completed: "2020-06-17T16:33:22+03:00",
            done: 'true'
        },
        {desc: "some text2", created: "2020-06-17T14:33:22+03:00", completed: "--:--", done: 'false'},
        {desc: "some text2", created: "2020-06-17T14:33:22+03:00", completed: "--:--", done: 'false'},
        {
            desc: "some text2",
            created: "2020-06-17T14:33:22+03:00",
            completed: "2020-06-17T16:33:22+03:00",
            done: 'true'
        },
        {desc: "some text2", created: "2020-06-17T14:33:22+03:00", completed: "--:--", done: 'false'},
    ], [
        {desc: "some text2", created: "2020-06-01T14:33:22+03:00", completed: "--:--", done: 'false'},
        {
            desc: "some text2",
            created: "2020-06-01T14:33:22+03:00",
            completed: "2020-06-01T18:33:22+03:00",
            done: 'true'
        },
        {desc: "some text3", created: "2020-06-01T16:12:22+03:00", completed: "2020-06-01T18:12:22+03:00", done: 'true'}
    ]
];


make_history_todolist(lastTodo);