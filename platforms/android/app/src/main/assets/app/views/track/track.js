var mapsModule = require("nativescript-google-maps-sdk");
var viewModel = require("./main-view-model");
const applicationSettings = require("application-settings");

function onNavigatingTo(args){
    if(!applicationSettings.hasKey("is_tracking")){
        applicationSettings.setBoolean("is_tracking",false);
    }
    var page = args.object;
    var context = page.navigationContext;
    page.bindingContext = viewModel.appViewModel(context.userid);
}

function onMapReady(args) {
  var mapView = args.object;
  var marker = new mapsModule.Marker();
  marker.position = mapsModule.Position.positionFromLatLng(viewModel.latitude, viewModel.longitude);
  marker.userData = { index : 1};
  mapView.addMarker(marker);
  mapView.settings.zoomGesturesEnabled = true;
  console.log("map ready");
}

function onMarkerSelect(args) {
   console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {
    console.log("cam changed");
}

function onCameraMove(args) {
    //console.log("Camera moving: "+JSON.stringify(args.camera));
}

exports.onNavigatingTo = onNavigatingTo;
exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
exports.onCameraMove = onCameraMove;