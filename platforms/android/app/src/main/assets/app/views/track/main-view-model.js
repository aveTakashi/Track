var geolocation = require("nativescript-geolocation");
var Observable = require("data/observable").Observable;
var dialogs = require("ui/dialogs");
var { Accuracy } = require("ui/enums");
var firebase = require("nativescript-plugin-firebase/app");
const applicationSettings = require("application-settings");
var uiframe = require("ui/frame");



function appViewModel (User){
    var viewModel = new Observable();
    var watchId;
    viewModel.is_tracking = applicationSettings.getBoolean("is_tracking");
    viewModel.zoom = 10;
    if(viewModel.is_tracking){
        viewModel.status = "Stop Tracking";
    }else{
        viewModel.status = "Start Tracking";
    }

    if(!geolocation.isEnabled()){
        geolocation.enableLocationRequest();
    }

    sessions = firebase.firestore().collection("Users").doc(User);
    
    if(geolocation.isEnabled()){
        watchId = geolocation.watchLocation(
            function(loc){
                if(loc){
                    console.log("watching"+watchId);
                    viewModel.set("latitude",loc.latitude);
                    viewModel.set("longitude",loc.longitude);
                    //uploading to firestore
                    if(viewModel.is_tracking){
                        current_location = loc;
                        timestamp = loc.timestamp.toString();
                        data = {
                            current_location : firebase.firestore().GeoPoint(loc.latitude,loc.longitude)
                        };
                        
                        data[timestamp] = firebase.firestore().GeoPoint(loc.latitude,loc.longitude);
                        sessions.update(data);
                        console.log(data);
                    }
                }
            },
            function(e){
                dialogs.alert(e.message);
            },
            {
                desiredAccuracy: Accuracy.high,
                updateDistance: 0,
                updateTime: 1,
                minimumUpdateTime : 10000
            }
        );    
    }else{
        dialogs.alert("Please Enable Geolocation For This App");
        geolocation.enableLocationRequest();
    }

    viewModel.toggleTracking = function(){
        this.set("is_tracking", !viewModel.is_tracking);
        if(viewModel.is_tracking){
            this.set("status","Stop Tracking");
        }else{
            this.set("status","Start Tracking");
        }
        applicationSettings.setBoolean("is_tracking",viewModel.is_tracking);
    };

    viewModel.doViewUsers = function(){
        uiframe.topmost().navigate("views/users/users");
    };

    viewModel.dologout = function(){
        geolocation.clearWatch(watchId);
        applicationSettings.remove("is_tracking");
        firebase.auth().signOut().then(function(){
        },
        function(e){
            console.log("error logging out");
        });
    };
    return viewModel;
}

exports.appViewModel = appViewModel;