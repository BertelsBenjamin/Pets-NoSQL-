//changes to index.html, style.css and main.js are displayed on localhost:5000
(function ($) {
  function loadTable() {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/loadTable",
    })
      .done(function (msg) {
        msg = JSON.parse(msg);
        console.log(msg);
        for (i = 0, j = 0; i < Object.keys(msg[j]).length; i++ , j++) {
          let keysArr = Object.keys(msg[i]);
          $('#table-header').append(
            '<td>' + keysArr[j] + '</td>'
          )
        }

        msg.map(e => {
          $('#data').append(
            '<tr class="table-row"><td>' + e.id + '</td>' + '<td>' + e.date + '</td>' + '<td>' + e.reftopet + '</td>' + '<td>' + e.type + '</td>' + '<td>' + e.remark + '</td></tr>'
          );
        })
      });
  }

  function addRow() {
    let inputArr = $("input");
    console.log(inputArr);
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/insertRow",
    })
      .done(function (msg) {
        console.log(msg);
      });
  }

  $(document).ready(function(){
    loadTable();
    $('#btn-insert-row').click(function(){
      addRow();
    })
  })

})(jQuery);