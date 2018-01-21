
const Marionette = require('backbone.marionette');

var Router = Marionette.AppRouter.extend({

	appRoutes: {

		'tienda/mercadona': 'shop',
		'tienda/mercadona/:category': 'shop',
		'tienda/mercadona/:category/:subcategory': 'shop',
		'*path' : 'home'

	}

});

module.exports = Router;
