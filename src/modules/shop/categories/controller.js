
const Marionette = require('backbone.marionette');

var Controller = Marionette.Object.extend({

	show: function(marketModel, categoriesCollection) {

		var _self = this;

		var View = require('./view');
		var view = new View({
			collection: categoriesCollection,
			templateHelpers: {
				market: marketModel.toJSON()
			}
		});
		APP.layouts.shop.categories.show(view);

		APP.reqres.setHandler('openCategory', function(link) {			
			_self.openCategory(link);
		});

	},

	openCategory: function(link) {

		APP.navigate(link);

	}

});

module.exports = Controller;
