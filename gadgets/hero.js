define(function(require, exports, module) {

    require("css!ratchet-gadgets/common.css");

    var html = require("text!ratchet-gadgets/hero.html");
    var Ratchet = require("ratchet");

    require("ratchet-web");
    require("ratchet-tmpl");
    require("bootstrap");

    return Ratchet.GadgetRegistry.register("hero", Ratchet.AbstractDynamicGadget.extend({

        TEMPLATE: html
		
	}));
});
