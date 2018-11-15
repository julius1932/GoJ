class FeesSetUpList {

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
        Adapter.read('/feessetup/feessetup', function(fees) {
            //alert("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            for (var i = 0; i <fees.length; i++) {
                var fee = fees[i];
                if (fees.amount) {
                    var fees_view = new FeesSetUp (fee._id,fee.amount,fee.purpose,fee.mandetory,fee._type,fee.crateria,fee.whoShouldPay,fee.accountType);
                    rest += fees_view.getView();
                    //alert(addRow("question", "id"));
                }

            }
             var fees_view = new FeesSetUp ('_id','amount','purpose','mandetory','_type','crateria','whoShouldPay','accountType');
                    rest += fees_view.getView();
                    fees_view = new FeesSetUp ('_id','amount','purpose','mandetory','_type','crateria','whoShouldPay','accountType');
                    rest += fees_view.getView();
            var table = document.getElementsByClassName("questions");
            table[0].innerHTML = "";

            //alert(rest);
            table[0].insertAdjacentHTML("beforeend", rest);
        });

    }

}
  
      