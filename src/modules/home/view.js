
const Marionette = require('backbone.marionette');

var View = Marionette.ItemView.extend({

	template: require('./templates/main.html'),

	events: {

		'click a#home-button-online': function(e) {
			e.preventDefault();
			this.openShop(false);
		},

		'click a#home-button-offline': function(e) {
			e.preventDefault();
			this.openShop(true);
		}

	},

	initialize: function() {

		$('body > div').attr({
			'data-page': 'home'
		});

	},

	openShop: function(offline) {

		APP.request('openShop', offline);

	}
	
});

module.exports = View;
