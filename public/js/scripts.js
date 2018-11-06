$(document).ready(function() {

    $(".log").submit(function(event) {
        event.preventDefault();
        Adapter.save($(this).serialize(), '/login', function(data) {
            alert(data.pp);
            window.location.href="/pp";
        })

    });

    $('.addQnForm').submit(function(event) {
        event.preventDefault();
        var question = document.getElementsByName("question")[0].value;
        var answer = document.getElementsByName("answer")[0].value;
        var subtext = document.getElementsByName("subtext")[0].value;
        var format = document.getElementsByName("format")[0].value;
        var qnId = document.getElementsByName("qnId")[0].value;
        var qnName = document.getElementsByName("squestionnaire")[0].value;
        var qry = `qnName=${qnName}&qn=${question}&answer=${answer}&format=${format}&subtext=${subtext}`;
        if (qnId) {
            qry += `&qnId=${qnId}`;
        }
        Adapter.save(qry, '/question', function(data) {
            var questionnaire1 = new QuestionList(qnName);
            questionnaire1.fillQns();
            closeForm("addQnForm");
            updateRowCount();
            updateNumQns();
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

subheader();