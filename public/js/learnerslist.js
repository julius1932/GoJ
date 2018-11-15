class LearnersList {

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
        Adapter.read('/learner/learner', function(learners) {
            //alert("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            for (var i = 0; i <learners.length; i++) {
                var learner = learners[i];
                if (learner.fname) {
                    var learner_view = new Learner(user._id,user.fname,user.sname,user.gender,user.email,user.phone,user.role);
                    rest += learner_view.getView();
                    //alert(addRow("question", "id"));
                }

            }
             var learner_view = new Learner('ppp','user.fname','user.sname','user.gender','user.email','user.phone','user.role');
                    rest += learner_view.getView();
                    learner_view = new Learner('ppp','user.fname','user.sname','user.gender','user.email','user.phone','user.role');
                    rest += learner_view.getView();
            var table = document.getElementsByClassName("questions");
            table[0].innerHTML = "";

            //alert(rest);
            table[0].insertAdjacentHTML("beforeend", rest);
        });

    }

}
  
      