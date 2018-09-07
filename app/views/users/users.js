var viewModel = require("./user-model");
const applicationSettings = require("application-settings");

function onNavigatingTo(args){
    var page = args.object;
    page.bindingContext = viewModel.appViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
