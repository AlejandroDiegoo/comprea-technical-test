
var UtilsPrototypes = {

	model: function() {
		
		var _self = this;
		
		return Backbone.Model.extend({
			
			parse: _self.parse,
			
			fetch: function(options) {
			  
				var model = this;
				
				options = _self.options(options);
				
				if (options.deferred) {
					model.defer = $.Deferred();
				}

				options.success = function(response) {
					resolve(response);
				};
				
				options.error = function(response) {
					response = response.responseJSON;
					if (!response) {
						response = _self.response();						
					}						
					resolve(response);
				};

				var resolve = function(response) {
					model.status = response.status;
					response = response;
					if (!model.set(model.parse(response, options), options)) {
						return false;
					}
					if (options.deferred) {							
						model.defer.resolve(model);
					}
					model.trigger('sync', model, response, options);
				};
				
				return this.sync('read', this, options);
				
			}
			
		});
		
	},
	
	options: function(options) {

		options = (options) ? _.clone(options) : {};
		options.parse = (options.parse) ? options.parse : true;
		options.deferred = (options.deferred) ? options.deferred : true;
		options.showError = (options.showError) ? options.showError : false;
		options.type = (options.type) ? options.type : 'GET';
		options.crossDomain = (options.crossDomain) ? options.crossDomain : true;
		options.datatype = (options.datatype) ? options.datatype : 'json';
		options.contentType = (options.contentType) ? options.contentType : 'application/json';
		options.data = (options.data) ? options.data : {};
		options.identityMap = false;
		
		return options;
		
	},

	parse: function(response, options) {

		return response;

	},
	
	response: function() {
		
		return {
			'status': 'Error',
			'data': null
		};
		
	}

};
	
module.exports = UtilsPrototypes;
