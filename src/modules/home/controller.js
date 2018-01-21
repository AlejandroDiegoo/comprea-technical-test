
const Marionette = require('backbone.marionette');

var Controller = Marionette.Object.extend({

	show: function() {

		var _self = this;

		var View = require('./view');
		var view = new View();
		APP.layouts.main.content.show(view);

		APP.reqres.setHandler('openShop', function(offline) {			
			_self.openShop(offline);
		});

	},

	openShop: function(offline) {

		APP.utils.settings.offline = offline;

		APP.navigate('tienda/mercadona', {
			trigger: true
		});

	}

});

module.exports = Controller;
