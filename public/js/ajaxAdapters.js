 class Adapter {

     static read(theUrl, callback) {
         $.ajax({
             url: theUrl,
             dataType: 'jsonp',
             success: callback
         });
     }
     static save(dataToSave, theUrl, cb) {
         $.ajax({
             url: theUrl,
             //dataType: 'text',
             type: 'post',
             contentType: 'application/x-www-form-urlencoded',
             data: dataToSave,
             success: cb
         });
     }
     static delete(dataToDelete, theUrl, cb) {
         $.ajax({
             url: theUrl,
             //dataType: 'text',
             type: 'delete',
             contentType: 'application/x-www-form-urlencoded',
             data: dataToDelete,
             success: cb
         });
     }

 }