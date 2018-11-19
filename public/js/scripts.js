$(document).ready(function() {
    
    $(".log").submit(function(event) {
        event.preventDefault();
        Adapter.save($(this).serialize(), '/login', function(data) {
            alert(data.pp);
            window.location.href="/pp";
        })

    });

    $('#add-users').submit(function(event) {
        event.preventDefault();
        var qry =$(this).serialize()+"&pass="+document.getElementsByName("sname")[0].value
        alert(qry);
        Adapter.save(qry, '/user/user:fname:sname:gender:email:phone:role:pass', function(data) {
            ///var questionnaire1 = new QuestionList(qnName);
            //questionnaire1.fillQns();
            closeForm("add-user");
           // updateRowCount();
            //updateNumQns();
        });

    });
    $('.publ').submit(function(event) {
        event.preventDefault();
        Adapter.save($(this).serialize(), '/s3', function(err, data) {
            closeForm("publ");
        });

    });
    $(".delQn").submit(function(event) {
        event.preventDefault();
        var qnid = document.getElementsByName("questionId")[0].value;
        var qry = 'qnId=' + qnid;
        Adapter.delete(qry, '/question', function(data) {
            deleteRow(qnid);
            closeForm("delQn");
            updateRowCount();
        });
    });

    /*var publishbtn = document.querySelector('.btnPublish');
    
    publishbtn.addEventListener("click",function() {
        publishbtn.innerHTML = "";
       publishbtn.classList.remove('secondary');
        publishbtn.classList.add('spinner');
        
      setTimeout( 
            function  (){  
                publishbtn.classList.remove('spinner');
                   publishbtn.classList.add('secondary');
                publishbtn.innerHTML = "Publish";
                
            }, 6000);
    }, false);
*/

});

function deleteRow(rowid) {
    var el = document.getElementById(rowid);
    el.parentNode.removeChild(el);
}

function updateRowCount() {
    Adapter.read('/questionnaires', function(qns) {
        for (var i = 0; i < qns.length; i++) {
            var qn = qns[i];
            if (!qn.num) {
                qn.num = 0;
            }
            if (qn.nam) {
                var span = document.getElementsByClassName(qn.nam);
                if (span) {
                    span[0].innerHTML = `(${qn.num})`;
                }
            }
        }
    });
}

/*$('.questions tr').onclick =function() {
   var $currentTable = $(this).closest('table'); 
     $currentTable.find('tr').removeClass('selected');
     $(this).addClass('selected');
   
}*/


function subheader() {
    var questionnrNames = "";
    Adapter.read('/questionnaires', function(qns) {
        for (var i = 0; i < qns.length; i++) {
            var qn = qns[i];
            if (qn.nam) {
                //results += questionnaireRow(qn.nam, qn.num);
                questionnrNames += `<option value='${qn.nam}'> ${qn.nam}</option>`;
            }
        }
        document.getElementsByName("tquestionnaire")[0].innerHTML = questionnrNames;
    });

}

//subheader();
