
const Marionette = require('backbone.marionette');

var Controller = Marionette.Object.extend({

	show: function(marketModel, categoriesCollection) {

		APP.layouts.shop = new Backbone.Marionette.LayoutView({
		    el: APP.layouts.main.content.el,
		    regions: {
		    	header: '#shop-header-region',
				content: '#shop-content-region',
				categories: '#shop-categories-region'
		    },
		    template: require('./templates/layout.html'),
		}).render();

		var HeaderController = require('./header/controller.js');
		new HeaderController().show(marketModel);

		var CategoriesController = require('./categories/controller.js');
		new CategoriesController().show(marketModel, categoriesCollection);

		var ContentController = require('./content/controller.js');
		new ContentController().show();

	}

});

module.exports = Controller;
