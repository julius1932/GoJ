class KlassesList {

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
        Adapter.read('/klass/klass', function(klasz) {
            ///alert("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            for (var i = 0; i < klasz.length; i++) {
                var klas = klasz[i];
                if (klas.level) {
                    var klas_view = new Klass(klas._id,klas.level,klass.division);
                    rest += klas_view.getView();
                    //alert(addRow("question", "id"));
                }

            }
             var klas_view = new Klass('klas._id','klas.level','klass.division');
                    rest += klas_view.getView();
                    klas_view = new Klass('klas._id','klas.level','klass.division');
                    rest += klas_view.getView();
            var table = document.getElementsByClassName("questions");
            table[0].innerHTML = "";

            //alert(rest);
            table[0].insertAdjacentHTML("beforeend", rest);
        });

    }

}
  
      