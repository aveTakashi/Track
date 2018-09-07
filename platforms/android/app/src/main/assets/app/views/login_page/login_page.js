var createViewModel = require("./login_view_model").Model_View();

function onNavigatingTo(args) {

    var page = args.object;
   
    page.bindingContext = createViewModel;
}

exports.onNavigatingTo = onNavigatingTo;
