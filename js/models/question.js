window.models["question"] = Backbone.Model.extend({
	

	urlRoot : 'api/questions/',

	defaults: {
		'qid' : null,
		'text' : "Enter Question Text",
		'options' : "Option A Text|:Option B Text|:Option C Text|:Option D Text",
		'correctAnswer' : 0,
		'explanation' : "Explanation Text here",
		'noOfOptions' : 4
	},

	initialize : function (opt){
		opt = opt || {qid: false};
		if(opt.qid)
		{
			this.set("qid", opt.qid);
			this.fetch();
		}
		else{
			var context = this;
			this.getIdFromServer().done(function(data){
				context.set("qid",data.data);
				console.log("new Model with id " + context.get("qid"));
			});
		}

	},

	getIdFromServer: function(){
		return $.ajax({
			type : "GET",
			dataType : "json",
			url : 'api/question/add',
			async : false 
		});
		
	}

});