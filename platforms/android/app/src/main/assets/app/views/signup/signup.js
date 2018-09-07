var Model = require("./signup-model").Model_View();


function onNavigatingTo(args){

    var page = args.object;

    page.bindingContext = Model;

}
exports.onNavigatingTo = onNavigatingTo;