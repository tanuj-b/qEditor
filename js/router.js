var AppRouter = Backbone.Router.extend({

	routes : {
		"" : "landing",
		"questions/add" : "addQuestion",
		"questions/edit" : "editQSelect",
		"questions/edit/:qid" : "editQuestion",
		"questions/reveal/:qid" : "revealForQuestion",
		"para/add" : "addPara",
		"para/edit/:pid" : "editPara"
	},

	initialize : function() {
		// fetch all the initial data here
		
	},

	landing : function() {
		this.loadView("landing","landing");
	},

	addQuestion : function(){
		var question = new models["question"]();
		this.loadView("question","question", {model : question });
	},
	editQuestion : function(qid){
		var question = new models["question"]({qid: qid});
		this.loadView("question","question", {model : question });
	},
	editQSelect : function(){
		var id = $("#e-qid").attr("value");
		window.location = '#questions/edit/' +id;
	},

	addPara : function(){
		var para = new models["para"]();
		this.loadView("para","para", {model : para });
	},
	editPara : function(qid){
		var para = new models["para"]({pid: pid});
		this.loadView("para","para", {model : para });
	},
	editPSelect : function(){
		var id = $("#e-pid").attr("value");
		window.location = '#para/edit/' +id;
	},

	revealForQuestion : function(qid){
		var question = new models["question"]({qid: qid});
		this.loadView("revealQ","revealQ",{model: question});
	},

	loadView : function(view,templateFile,options){
		return $.ajax({
			type : "GET",
			dataType : "html",
			url : '../templates/'+templateFile+'.html',
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