
const Marionette = require('backbone.marionette');

var View = Marionette.ItemView.extend({

	template: require('./templates/main.html'),

	events: {

		'click a': function(e) {
			e.preventDefault();
			$('#shop-categories-region').removeClass('hidden');
		}

	},

	initialize: function() {

		$('body > div').attr({
			'data-page': 'shop'
		});

	},

	onShow: function() {

		var bannerImage = $('#shop-header-banner').data('image');

		$('#shop-header-banner').css({
			'background-image': 'url(\'' + bannerImage + '\')'
		});

		var iconImage = $('#shop-header-banner').find('.icon').data('image');

		$('#shop-header-banner').find('.icon').css({
			'background-image': 'url(\'' + iconImage + '\')'
		});

	}
	
});

module.exports = View;
