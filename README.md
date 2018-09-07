## Firebase Authentication With Nativescript
This Repository is a location beacon that uploads users geolocations to a firestore database.

## Clone
```
git clone https://github.com/ave12345/Track.git
```

## Requirements
```
The installation of the nativescript CLI would be needed to run the application. You can head over to <https://www.npmjs.com/package/nativescript> for details on how to install nativescript CLI.
```

## Installation
cd into the folder and
run the following in your terminal
```
tns run android
``` 
This builds and install the nativescript application on your android emulator. (Please Make sure you have an emulator installed and opened before executing the ```tns run``` command).

## Configuring a nativescript project for firebase services.
Note: This process is not needed for the this repository.

After creating both your firebase and nativescript projects

1.   Your firbase secrets ```(google-services.json)``` which was downloaded after creating your android project in the        firbase console should be copied and pasted in: ```(nativescript_project)\app\App_Resources\Android``` folder.
2.   The ApplicationId in the app.gradle file found in: ```(nativescript_project)\app\App_Resources\Android``` folder         should be set to the package name of your firebase project. In this case it is: ```org.nativescript.firecast```.
3.   In the same app.gradle file add ```multiDexEnabled true``` in the ```defaultConfig``` object. This allows your app       to be able to reference more than 6k methods.
4.   In your package.json file found in your root folder (firecast), set the id value of the nativescript object to the       package id of the firebase project.
5.   In your terminal ```cd nativescript_project``` and execute ``` tns plugin add nativescript-plugin-firebase``` to         install the nativescript plugin for firebase.
