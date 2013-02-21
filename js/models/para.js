window.models["para"] = Backbone.Model.extend({
	

	urlRoot : 'api/para/',

	defaults: {
		'pid' : null,
		'text' : "Enter Para Text"
	},

	initialize : function (opt){
		var context = this;
		opt = opt || {pid: false};
		if(opt.pid)
		{
			console.log("Has own pid")
			this.set("pid", opt.pid);
			$.ajax({
				type : "GET",
				dataType : "json",
				url : '../api/getpara/' + opt.pid,
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
				context.set("pid",data.data);
				console.log("new Para with id " + context.get("pid"));
			});
		}

	},

	getIdFromServer: function(){
		return $.ajax({
			type : "GET",
			dataType : "json",
			url : '../api/addpara',
			async : false
		});
		
	}

});