var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"questions/add" : "addQuestion"
	},

	initialize : function() {
		// fetch all the initial data here
		
	},

	landing : function() {
		this.loadView("landing","landing");
	},

	addQuestion : function(){
		var question = new models["question"]();
		this.loadView("questionAdd","questionAdd", {model : question });
	},
	loadView : function(view,templateFile,options){
		return $.ajax({
			type : "GET",
			dataType : "html",
			url : 'templates/'+templateFile+'.html',
			async : false
		})
		.done(function(data) {	
			window.views[view].prototype.template = _.template(data);
			options = options || {};
			options.el = $("#content");
			window.currentView = new views[view](options);
		});
	}

});

var app = new AppRouter();
var currentView = null;
Backbone.history.start();