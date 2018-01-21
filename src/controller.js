
const Controller = {

	preloaded: false,

	go: function(callback) {

		if (!this.preloaded) {

			APP.navigate('', {trigger: true});

		} else {

			if ($('#preload-region').is(':visible')) {

				callback();

				setTimeout(function() {
					$('#preload-region').fadeOut('slow');
				}, 150);

			} else {

				$('#preload-region').fadeIn('slow', function() {

					callback();

					setTimeout(function() {
						$('#preload-region').fadeOut('slow');
					}, 150);

				});

			}

		}

	},

	home: function() {

		this.preloaded = true;

		this.go(function() {
			var Controller = require('./modules/home/controller.js');
			new Controller().show();
		});

	},

	shop: function(category, subcategory) {

		var _self = this;

		this.go(function() {
			_self.stepSession();
		});

	},

	// Funciones que simulan el flujo de la aplicación.
	// El token debería obtenerse al entrar y estar
	// disponible para el resto de peticiones

	stepSession: function() {

		var _self = this;

		var requestSession = APP.request('model:user:session');

		$.when(requestSession).then(function(responseSession) {

			if (responseSession.get('status') == 'OK') {

				console.log(responseSession);

				APP.utils.settings.token = responseSession.get('token');

				_self.stepPostalCode(28010);

			}

		});

	},

	// Esta peteición debería realizarse al introducir
	// el usuario su código postal

	stepPostalCode: function(postalcode) {

		var _self = this;

		var requestPostalCode = APP.request('model:user:postalcode', postalcode);

		$.when(requestPostalCode).then(function(responsePostalCode) {

			if (responsePostalCode.get('status') == 'OK') {

				var marketCollection = new Backbone.Collection(responsePostalCode.get('markets'));

				var marketModel = marketCollection.findWhere({
					id: 1
				});

				marketModel.set('postalCode', postalcode);

				_self.stepCategories(marketModel);

			}

		});

	},

	// Esta petición debería realizarse cuando el usuario selecciona
	// uno de los mercados disponibles en su código postal

	stepCategories: function(marketModel) {

		var requestCategories = APP.request('model:company:categories', marketModel.get('id'));

		$.when(requestCategories).then(function(responseCategories) {

			if (responseCategories.get('status') == 'OK') {

				var categoriesCollection = new Backbone.Collection(responseCategories.get('categories'));

				var Controller = require('./modules/shop/controller.js');
				new Controller().show(marketModel, categoriesCollection);

			}

		});

	},
};

module.exports = Controller;
