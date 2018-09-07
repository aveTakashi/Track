var application = require("application");
var firebase = require("nativescript-plugin-firebase");
var uiframe = require("ui/frame");

firebase.init({
    onAuthStateChanged: function(data){
        if(data.loggedIn){
            users = firebase.firestore.collection("Users");
            users.doc(data.user.uid).get().then(doc =>{
                if(!doc.exists){
                        users.doc(data.user.uid).set({
                        email : data.user.email
                    });
                }
            });
            uiframe.topmost().navigate(
                {
                    moduleName: "views/track/track.",
                    context: {userid : data.user.uid}
                }
            );
        }else{
            uiframe.topmost().navigate("views/login_page/login_page");
        }
    }
}).then(
    function(instance){
        console.log("firebase has been initialized");
    }, function(error){
        console.log("firbase init error: "+error);
    }
);

application.android.on(application.AndroidApplication.activityBackPressedEvent, function(args){
    args.cancel = true;
})

application.run({ moduleName: "app-root" });


