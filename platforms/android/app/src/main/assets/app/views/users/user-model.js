var Observable = require("data/observable").Observable;
var ObArray = require("data/observable-array").ObservableArray;
var dialogs = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase/app");
var uiframe = require("ui/frame");

getOnlineUser = function(){
    user = firebase.firestore().collection("Users");
    user.get().then( docs =>{
        docs.forEach(doc => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          });
    });
};
getOnlineUser();
function appViewModel (){
    
    viewModelArray = new ObArray([{username : "Ave"},{ username : "Ave"},{ username : "Ave"}]);
    viewModel = new Observable();
    viewModel.username = viewModelArray;

    viewModel.onback = function(){
        uiframe.topmost().navigate({
           moduleName : "views/track/track",
           clearHistory : true
        });
    };


    return viewModel;
}
exports.appViewModel = appViewModel;