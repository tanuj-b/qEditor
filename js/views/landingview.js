window.views["landing"] = Backbone.View.extend({
	initialize : function(){
		this.render();
	},
	render : function(){
		$(this.el).html(this.template());
	}
});