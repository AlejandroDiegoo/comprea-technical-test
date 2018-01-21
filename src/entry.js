
const jquery = window.$ = require('jquery');
const Backbone = require('backbone');
const Marionette = require('backbone.marionette');
const css = require('./css/main.css');

const APP = window.APP = new Marionette.Application();

function start() {
  
	APP.layouts = {};
	APP.layouts.main = new Backbone.Marionette.LayoutView({
	    el: 'body > div',
	    regions: {
	      content: '#content-region',
	      preload: '#preload-region'
	    },
	    template: require('./templates/layout.html'),
	}).render();

	APP.utils = require('./utils.js');
	APP.utils.initialize();

	Backbone.emulateHTTP = true;
  	Backbone.Model = APP.utils.prototypes.model();

	var Router = require('./router.js');

	APP.navigate = new Router({
		controller: require('./controller.js')
	}).navigate;

	Backbone.history.start({
		pushState: false
	});

}

$(document).ready(function() {
  start();
});
