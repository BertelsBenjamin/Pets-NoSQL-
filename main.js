//changes to index.html, style.css and main.js are displayed on localhost:5000
(function ($) {

  //VARIABLES & FUNCTIONS
  let selectedTable = "";


  function getDatabaseTables() {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/getTables'
    })
      .done(function (tables) {
        tables = JSON.parse(tables);
        console.log(tables);
        for (i = 0; i < tables.length; i++) {
          $("#select-table").append(
            "<option class='form-option' value='" + tables[i].Tables_in_petslog + "' " + ">" + tables[i].Tables_in_petslog + "</option>"
          )
        }
      })
  }

  /* function selectTable(){
    console.log('test');
    $('select option:selected').each(function(){
      debugger;
      selectedTable += $(this).text();
      console.log(selectedTable);
    })
  } */

  function loadTable() {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/load",
    })
      .done(function (data) {
        data = JSON.parse(data);
        console.log(data);

        
        for (i = 0, j = 0; i < Object.keys(data[j]).length; i++ , j++) {
          let keysArr = Object.keys(data[i]);
          $('#table-header').append(
            '<td>' + keysArr[j] + '</td>'
          )
        }

        data.map(e => {
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
        console.log(inputArr);
      });
  }

  $(document).ready(function () {
    getDatabaseTables();
    loadTable();
    $('select').change(function(){
    $('select option:selected').each(function(){
      selectedTable = $(this).text();
      console.log(selectedTable);
    })
    });
    $('#btn-insert-row').click(function () {
      addRow();
      loadTable();
    })
  })

})(jQuery);