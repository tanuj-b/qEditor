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
		var context = this;
		opt = opt || {qid: false};
		if(opt.qid)
		{
			console.log("Has own qid")
			this.set("qid", opt.qid);
			$.ajax({
				type : "GET",
				dataType : "json",
				url : 'api/question/' + opt.qid,
				async : false
			}).done(function(data){
				for(key in data.data){
					context.set(key,data.data[key]);
				}
				//set number of options
				//read correct answer
			});
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