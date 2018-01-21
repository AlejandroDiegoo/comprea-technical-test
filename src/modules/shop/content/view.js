
const Marionette = require('backbone.marionette');

var View = Marionette.ItemView.extend({

	template: require('./templates/main.html'),
	
});

module.exports = View;
