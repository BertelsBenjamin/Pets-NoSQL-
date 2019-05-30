//changes to index.html, style.css and main.js are displayed on localhost:5000
(function ($) {

  //VARIABLES & FUNCTIONS
  let selectedTable = "pet";


  function clearTable() {
    $('#table-body tr').remove();
  }

  function getDatabaseTables() {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/getTables'
    })
      .done(function (tables) {
        tables = JSON.parse(tables);
        console.log(tables);
        for (let i = 0; i < tables.length; i++) {
          $("#select-table").append(
            "<option selected='true' class='form-option' value='" + tables[i].Tables_in_petslog + "' " + ">" + tables[i].Tables_in_petslog + "</option>"
          )
        }
      })
  }

  function loadTable(selectedTable) {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/load/" + selectedTable,
    })
      .done(function (data) {
        data = JSON.parse(data);
        console.log(data);
        $('#table-head tr td').remove();
        for (i = 0, j = 0; i < Object.keys(data[j]).length; i++ , j++) {
          let keysArr = Object.keys(data[i]);
          $('#table-header').append(
            '<td>' + keysArr[j] + '</td>'
          )
        }

        if (selectedTable = 'event') {
          clearTable();
          data.map(e => {
            $('#table-body').append(
              '<tr class="table-row"><td>' + e.id + '</td>' + '<td>' + e.date + '</td>' + '<td>' + e.reftopet + '</td>' + '<td>' + e.type + '</td>' + '<td>' + e.remark + '</td></tr>'
            );
          })
        }

        if (selectedTable = 'pet') {
          clearTable();
          data.map(e => {
            if (e.death === null) {
              e.death = "Still alive";
            }
            $('#table-body').append(
              '<tr class="table-row"><td>' + e.id + '</td><td>' + e.name + '</td><td>' + e.owner + '</td><td>' + e.species + '</td><td>' + e.sex + '</td><td>' + e.birth + '</td><td>' + e.death + '</td></tr>'
            );
          })
        }

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
    console.log(selectedTable);
    getDatabaseTables();
    $('select').change(function () {
      $('select option:selected').each(function () {
        selectedTable = $(this).text();
        console.log(selectedTable);
      })
      clearTable();
      loadTable(selectedTable);
    });
    $('#btn-insert-row').click(function () {
      addRow();
      clearTable();
      loadTable(selectedTable);
    })
    clearTable();
    loadTable(selectedTable);
  })

})(jQuery);