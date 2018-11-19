class UsersList {

    constructor() {

        this._view = `<div class="container-fluid"> 
                     <button class="primary" onclick="openForm('add-user')">Add Question</button>
                     <a class="btnPublish secondary" onclick="openForm('publ','','')" >Publish</a>
                    <div class="separator "></div>
                    <table class="questions table table-hover"></table>
                </div>`;
        this.makeTable();
        ///this.addToFormDom();
    }
    addToFormDom() {
        var el = document.createElement("div");
        el.innerHTML += `<div class="form-popup" id="add-user">
                           <form  class="form-container" id ="add-users">
                              <div class="popup-header"> New User</div>
                              <input type="text" placeholder="Forename" name="forename"  equired> 
                              <input type="text" placeholder="Surname" name="surname"  equired> 
                              <input type="text" placeholder="Gender" name="gender"  equired> 

                              <input type="text" placeholder="Email" name="email"  equired> 
                              <input type="text" placeholder="Phone number" name="phone"  equired> 
                              <input type="text" placeholder="role" name="role"  equired> 
                              <button type="submit" class="btn" >SEND</button>
                             <button type="button" class="btn cancel" onclick="closeForm(\'add-user\')">CANCEL</button>
                            </form>
                          </div>`;
        console.log(el.firstChild);
        document.body.appendChild(el.firstChild);
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
        Adapter.read('/user/user', function(users) {
            //alert("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.fname) {
                    var user_view = new User(user._id, user.fname, user.sname, user.gender, user.email, user.phone, user.role);
                    rest += user_view.getView();
                    //alert(addRow("question", "id"));
                }

            }
           /* var user_view = new User('ppp', 'user.fname', 'user.sname', 'user.gender', 'user.email', 'user.phone', 'user.role');
            rest += user_view.getView();
            user_view = new User('ppp', 'user.fname', 'user.sname', 'user.gender', 'user.email', 'user.phone', 'user.role');
            rest += user_view.getView();*/
            var table = document.getElementsByClassName("questions");
            table[0].innerHTML = "";

            //alert(rest);
            table[0].insertAdjacentHTML("beforeend", rest);
        });

    }

}