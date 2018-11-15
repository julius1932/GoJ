class Invoice {
    constructor(_id,paymentProgress,learnerId,feesSetUpId) {
        //paymentProgress:learnerId:feesSetUpId
        this.paymentProgress=paymentProgress;
        this.learnerId=learnerId;
        this._id = _id;
        this._view = `<tr id ="${this._id}" >
                    <td class="question clickableAwesomeFont" title='${this.qn}' onclick="openForm('addQnForm','${this._id}','id')" > ${this.qn}</td>
                    <td class="question "> ${this.paymentProgress}</td>
                    <td class="question "> ${this.learnerId}</td>
                    <td title='edit user'>
                    <span class="edit clickableAwesomeFont"  onclick="openForm('addQnForm','${this._id}','id')">
                    <img class="svg edit" src="icons/baseline-edit-24px.svg"/>
                     </span>
                    </td>
                     <td title='delete user'>
                        <span class="delete clickableAwesomeFont" onclick="openForm('delQn','${this._id}','id')"><img class="svg delete" src="icons/baseline-delete-24px.svg"/>
                      </span>
                    </td>
                </tr>`;
    }
    getView() {
        return this._view;
    }
    get_Id() {
        return this._id;
    }
    autoFill(qnnire, typ) {
        qnnire = qnnire.toLowerCase();
        var questionnrNames = "";
        //Adapter.findQuestionnaires(function(qns) {
        Adapter.read('/questionnaires', function(qns) {
            for (var i = 0; i < qns.length; i++) {
                var qn = qns[i];
                if (qn.nam) {
                    //results += questionnaireRow(qn.nam, qn.num);
                    questionnrNames += `<option value='${qn.nam}'> ${qn.nam}</option>`;
                }
            }
            document.getElementsByName("squestionnaire")[0].innerHTML = questionnrNames;
            //alert(questionnrNames);

            if (typ === "id") {
                document.getElementsByName("qnId")[0].value = qnnire;
                var arr = qnnire.split('/');
                var id = qnnire;
                qnnire = arr[1];
                //Adapter.findQuestion(qnnire, id, function(qn) {
                Adapter.read('/question?name=' + qnnire + '&id=' + id, function(qn) {
                    document.getElementsByName("question")[0].value = qn.question;
                    document.getElementsByName("answer")[0].value = qn.answer;
                    document.getElementsByName("subtext")[0].value = qn.subtext;
                    var options = document.getElementsByName("format")[0].options;
                    for (i = 0; i < options.length; i++) {
                        if (options[i].text.toLowerCase().indexOf(qn.format.toLowerCase()) > -1) {
                            options[i].selected = true;
                            break;
                        }
                    }
                });

            } else {
                document.getElementsByName("qnId")[0].value = "";
                document.getElementsByName("question")[0].value = "";
                document.getElementsByName("answer")[0].value = "";
                document.getElementsByName("subtext")[0].value = "";
            }
            var options = document.getElementsByName("squestionnaire")[0].options;
            //alert(qnnire);
            for (i = 0; i < options.length; i++) {
                if (options[i].text.toLowerCase().indexOf(qnnire.toLowerCase()) > -1) {
                    options[i].selected = true;
                    break;
                }
            }
        });


    }
}
