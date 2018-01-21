
const modelSession = require('./../prototypes/user/session.json');
const modelPostalCode = require('./../prototypes/user/postalcode.json');
const modelCategories = require('./../prototypes/company/categories.json');

var UtilsModels = {
			
	userSession: function() {

		if (APP.utils.settings.offline) {

			var model = new Backbone.Model(modelSession);

			return model;

		} else {

			var Model = Backbone.Model.extend();
		
			var model = new Model();

			model.url = APP.utils.settings.api + '/user/session';

			model.fetch();

			return model.defer.promise();

		}

	},

	userPostalCode: function(postalCode) {

		if (APP.utils.settings.offline) {

			var model = new Backbone.Model(modelPostalCode);

			return model;

		} else {

			var Model = Backbone.Model.extend();
		
			var model = new Model();

			model.url = APP.utils.settings.api + '/user/postalcode';

			model.fetch({
				data: {
					'token': APP.utils.settings.token,
					'postalcode': postalCode
				}
			});

			return model.defer.promise();

		}

	},

	companyCategories: function(idMarket) {

		if (APP.utils.settings.offline) {

			var model = new Backbone.Model(modelCategories);

			return model;

		} else {

			var Model = Backbone.Model.extend();
		
			var model = new Model();

			model.url = APP.utils.settings.api + '/company/categories';

			model.fetch({
				data: {
					'token': APP.utils.settings.token,
					'company_id': idMarket
				}
			});

			return model.defer.promise();

		}

	}
			
};
 
APP.reqres.setHandler('model:user:session', function() {			
	return UtilsModels.userSession();
});

APP.reqres.setHandler('model:user:postalcode', function(postalCode) {			
	return UtilsModels.userPostalCode(postalCode);
});

APP.reqres.setHandler('model:company:categories', function(idMarket) {			
	return UtilsModels.companyCategories(idMarket);
});

module.exports = UtilsModels;
