
const Marionette = require('backbone.marionette');

var Controller = Marionette.Object.extend({

	show: function(marketModel) {

		var View = require('./view');
		var view = new View({
			model: marketModel
		});
		APP.layouts.shop.header.show(view);

	}

});

module.exports = Controller;
