window.views["para"] = Backbone.View.extend({

	initialize:function () {
        this.render();
	    this.editors = [];
	    this.prePreview = [];
	    this.list = ['text'];
	    var editor = [];

        _.each(this.list,function(item){
        	editor[item] = CKEDITOR.replace(item,
    		{
	            filebrowserBrowseUrl : pathToFM+'/browser/default/browser.html?Connector=' + pathToPHP + '/connector.php',
	            filebrowserImageBrowseUrl : pathToFM + '/browser/default/browser.html?Type=Image&Connector='+pathToPHP+'/connector.php',
	            filebrowserFlashBrowseUrl : pathToFM + '/browser/default/browser.html?Type=Flash&Connector='+pathToPHP + '/connector.php'
            });
        });
        this.editor = editor;
        //this.model.set('editors', editor);
    },

    events: {
        'click .edit': 'edit',
        'click .preview': 'preview',
        'click #submit' : 'submit'
    },

    copyImages : function(){
    	var context = this;
    	var srcMap = {
    		oldSrc : [],
    		newSrc : []
    	};
    	var i = 0;
    	_.each(this.list,function(item){
    			data = context.editor[item].getData();
    			var a = $("<div>");
    			a.html(data).find("img").each(function(r){
    					srcMap.oldSrc[i] = $(this).attr("src");
    					var extension = $(this).attr("src").substr(-3);
    					extension = (extension == "peg") ? "jpeg" : extension;
  						srcMap.newSrc[i] = pathToFinalImages + "/p" 
  						+ context.model.get("pid") + "img" + (i + 1) + "." + extension;
                        $(this).attr("src",srcMap.newSrc[i]);
  						i += 1;
    				});
                context.editor[item].setData(a.html());
    		});
    	console.log("Source Map looks like this :");
    	console.log(srcMap);
        if(i>0)
        	$.ajax({
    			type : "POST",
    			dataType : "json",
    			data : srcMap,
    			url : '../api/copyImages'
    		})
    		.done(function(data) {	
    			_.each(this.list,function(item){
                    context.editor[item].setData(context.editor[item].getData());
                });
    		});
    },

    edit: function(e){
    	id = ($(e.target).attr("id")).substr(2);
    	$('#'+id).html(this.prePreview[id]);
    	this.editor[id] = CKEDITOR.replace(id,
    		{
	            filebrowserBrowseUrl : pathToFM+'/browser/default/browser.html?Connector=' + pathToFM + 'connectors/php/connector.php',
	            filebrowserImageBrowseUrl : pathToFM + '/browser/default/browser.html?Type=Image&amp;Connector='+pathToFM+'/connectors/php/connector.php',
	            filebrowserFlashBrowseUrl : pathToFM + '/browser/default/browser.html?Type=Flash&amp;Connector='+pathToFM+'/connectors/php/connector.php'
            });
    },

    preview: function(e){
    	id = ($(e.target).attr("id")).substr(2);
    	var context = this;
    	if(id=="all")
    		_.each(this.list,function(item){
    			context.prePreview[item] = context.editor[item].getData();
	    		context.editor[item].destroy();
	    		$(this).html(context.prePreview[item]);
	    		var math = document.getElementById(item);
         		MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);		
    		});
    	else
		{	context.prePreview[id] = context.editor[id].getData();
	    	context.editor[id].destroy();
	    	$(id).html(context.prePreview[id]);
	    	var math = document.getElementById(id);
         	MathJax.Hub.Queue(["Typeset", MathJax.Hub, math]);
	    }
    },

    submit:  function(e){
    	var data = {};
    	var context = this;
    	
    	this.model.set("text",context.editor["text"].getData());
    
		this.copyImages();

		return $.ajax({
			type : "POST",
			dataType : "json",
			data : this.model.toJSON(),
			url : '../api/updatepara'
		})
		.done(function(data) {	
			
		});
    		//l3id,
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});