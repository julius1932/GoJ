class InvoicesList {

    constructor() {  

        this._view = `<div class="container-fluid"> 
                     <button class="primary" onclick="openForm('addQnForm',' ','qnnaire')">Add Question</button>
                     <a class="btnPublish secondary" onclick="openForm('publ','','')" >Publish</a>
                    <div class="separator "></div>
                    <table class="questions table table-hover"></table>
                </div>`;
        this.makeTable();
    }
    makeTable() {
        var body = document.getElementById('page-content-wrapper');
        var right = document.getElementsByClassName('container-fluid')[0];
        if (right) {
            right.parentNode.removeChild(right);
        }
        body.insertAdjacentHTML("beforeend", this._view);
    }
    getView() {
        return this._view;
    }
    
    fillData() {
        //document.getElementsByClassName("header-title")[0].innerHTML = this.qnire;
        var rest = "";
        Adapter.read('/invoice/invoice', function(invos) {
            ///alert("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            for (var i = 0; i < invos.length; i++) {
                var invo = invos[i];
                if (invo.learnerId) {
                    var invo_view = new Invoice(invo._id,invo.paymentProgress,invo.learnerId,invo.feesSetUpId);
                    rest += invo_view.getView();
                    //alert(addRow("question", "id"));
                }

            }
             var invo_view = new Invoice('invo._id','invo.paymentProgress','invo.learnerId','invo.feesSetUpId');
                    rest += invo_view.getView();
                    invo_view = new Invoice('invo._id','invo.paymentProgress','invo.learnerId','invo.feesSetUpId');
                    rest += invo_view.getView();
            var table = document.getElementsByClassName("questions");
            table[0].innerHTML = "";

            //alert(rest);
            table[0].insertAdjacentHTML("beforeend", rest);
        });

    }

}
  
      