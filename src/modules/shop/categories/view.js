
const Marionette = require('backbone.marionette');

var itemView = Marionette.ItemView.extend({

	tagName: 'li',

	className: 'category',

	template: require('./templates/item.html'),

	attributes: function() {

	    return {
	      	'data-link': '/' + this.model.get('shortcut')
	    };

	},

});

var View = Marionette.CompositeView.extend({

	childView: itemView,

  	childViewContainer: 'ul',

	template: require('./templates/main.html'),

	events: {

		'click #categories-background': function(e) {
			$('#shop-categories-region').addClass('hidden');
		},

		'click #categories-panel': function(e) {
			e.stopPropagation();
		}

	},

	onShow: function() {

		var topColorRgb = $('#categories-panel-top').data('color');

		$('#categories-panel-top').css({
			'background-color': 'rgb(' + topColorRgb + ')'
		});

		var topIconImage = $('#categories-panel-top').find('.icon').data('image');

		$('#categories-panel-top').find('.icon').find('span').css({
			'background-image': 'url(\'' + topIconImage + '\')'
		});

		$('#categories-panel-list').find('.icon').each(function() {

			var iconImage = $(this).data('image');

			if (iconImage) {
				$(this).find('span').css({
					'background-image': 'url(\'' + iconImage + '\')'
				});
			}

		});

		$('#categories-panel-list').find('li').click(function() {

			if ($(this).has('ul').length > 0) {

				if (!$(this).hasClass('unfolded')) {

					$('#categories-panel-list').find('li.category').removeClass('unfolded');
					$(this).addClass('unfolded');

				}
				
			} else {

				$('#categories-panel-list').find('li').removeClass('checked');
				$(this).addClass('checked');

				var link = 'tienda/mercadona' + $(this).data('link');
				
				APP.request('openCategory', link);

				$('#shop-content-region').find('span').html('/' + link);

			}

		});

	}
	
});

module.exports = View;
