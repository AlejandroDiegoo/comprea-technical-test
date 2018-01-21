
const Marionette = require('backbone.marionette');

var Controller = Marionette.Object.extend({

	show: function() {

		var View = require('./view');
		var view = new View();
		APP.layouts.shop.content.show(view);

	}

});

module.exports = Controller;
