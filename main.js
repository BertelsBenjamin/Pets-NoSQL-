//changes to index.html, style.css and main.js are displayed on localhost:5000
(function ($) {

  /*DOCUMENT READY */
  $(document).ready(function () {
    $('#btn-pets').click(function () {
      $.ajax({
          method: 'POST',
          url: "http://localhost:3000/" + 'pet',
          dataType: "json"
        })
        .done({
          function (data) {
            console.log('Call is done.')
            data = JSON.parse(data);
            console.log('Data: ', data);
          }
        })
        .fail(function (err) {
          console.log(err);
        })
    })

    $('#btn-events').click(function () {
      $.ajax({
          method: 'POST',
          url: "http://localhost:3000/" + 'event'
        })
        .done({
          function (data) {
            //data = JSON.parse(data);
            console.log('test');
            console.log('data', data);
          }
        })
        .fail(function (err) {
          console.log(err);
        })
    })
  })
})(jQuery);