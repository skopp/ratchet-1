(function($)
{
    Display2 = Ratchet.Gadget.extend(
    {
        constructor: function(id, ratchet)
        {
            this.base(id, ratchet);
        },

        setup: function()
        {
            this.get(this.index);

            // subscribe to observable
            this.subscribe("value", function() {

                Ratchet.debug("Display 2 updating: " + this.observable("value").get());

                this.run("GET", "/");
            });
        },
        
        index: function(el)
        {
            el.model["value"] = this.observable("value").get();

            el.transform("templates/display2", function() {
                el.swap();
            });
            
        }
    });

    Ratchet.GadgetRegistry.register("display2", Display2);

})(jQuery);