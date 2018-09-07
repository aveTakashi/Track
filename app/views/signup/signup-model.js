var firebase = require("nativescript-plugin-firebase");
var observable = require("data/observable").Observable;
var uiframe = require("ui/frame");
var dialogs = require("ui/dialogs");



verify_mail = function(){
    firebase.sendEmailVerification().then(function(){
        dialogs.alert({
            title : "Verification",
            message : "A Verification Mail Has Been Sent To Your Email",
            okButtonText :"OK"
    });
    },
    function(error){
        dialogs.alert({
            title : "Verification Error",
            message : "Error Verifying Your Email",
            okButtonText : "OK"
        });
    });
    };


create_user = function(email, password){
    firebase.createUser({
        email: email,
        password: password
    }).then( function(result){
        dialogs.alert({
            title: "SignUp Successful",
            message : JSON.stringify(result),
            okButtonText : "Ok"
        });   
        uiframe.topmost().navigate("views/login_page/login_page");          
    },
    function(error){
        dialogs.alert({
            title: "SignUp Incomplete",
            message : JSON.stringify(error),
            okButtonText : "Ok"
        });
    }
    );
};


data_validation = function(email, password, c_password,username){
    if(email != "" && password != "" && password === c_password && username !=""){
        return true;
    }else{
        dialogs.alert({
            title :"Validattion Error",
            message : "Please Validate Your Information!",
            okButtonText : "OK"
        });
        return false;
    }
};


Model_View = function(){
    model = new observable();
    model.username = "";
    model.email = "";
    model.password = "";
    model.c_password = "";
    
    model.dosignup = function(){
        var check = data_validation(this.email,this.password,this.c_password,this.username);
        if(check){
            create_user(this.email,this.password);
            verify_mail();
        }
    };

    model.onback = function(){
        uiframe.topmost().navigate({
           moduleName : "views/login_page/login_page",
           clearHistory : true
        });
    };

    return model;
};

exports.Model_View = Model_View;