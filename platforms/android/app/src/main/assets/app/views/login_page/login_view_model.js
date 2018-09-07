var Observable = require("data/observable").Observable;
var uiframe = require("ui/frame");
var firebase = require("nativescript-plugin-firebase");
var dialogs = require("ui/dialogs");

function Model_View(){
    viewModel = new Observable();
    viewModel.username = "";
    viewModel.password = "";
    viewModel.User ={};

    viewModel.onTap = function(){
        firebase.login({
            type : firebase.LoginType.PASSWORD,
            passwordOptions : {
                email : this.username,
                password : this.password
            }
        }).then( 
            function(result){
            console.log("logging in...");
        },
        function(errorMessage) {
            dialogs.alert({
                title : "Login error",
                message : "Invalid Username or Password",
                okButtonText : "OK"
                
            });
        }
    );
    };

    viewModel.onTapGoogle = function(){
        firebase.login({
            type : firebase.LoginType.GOOGLE
        }).then(
            function(result){
                console.log("logging in..");
            },
            function (errorMessage) {
                dialogs.alert({
                    title: "Login error",
                    message: "Invalid Username or Password",
                    okButtonText: "OK"
                });
            }
        );
    };
    
    viewModel.onsignup = function(){
        uiframe.topmost().navigate({
           moduleName : "views/signup/signup",
           clearHistory : true
        });
    };
    return viewModel;
}


exports.Model_View = Model_View;