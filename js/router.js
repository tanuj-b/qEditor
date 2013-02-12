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
		this.loadView("questionAdd","questionAdd");
		
	},
	loadView : function(view,templateFile){
		return $.ajax({
			type : "GET",
			dataType : "html",
			url : 'templates/'+templateFile+'.html',
			async : false
		})
		.done(function(data) {	
			window.views[view].prototype.template = _.template(data);
			window.currentView = new views[view]({el : $("#content")});
		});
	}

});

var app = new AppRouter();
var currentView = null;
Backbone.history.start();