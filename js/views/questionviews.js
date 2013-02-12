var pathToFM = 'ckeditor/filemanager';
var pathToPHP = 'http://localhost/qEditor/ckeditor/filemanager/connectors/php';

window.views["questionAdd"] = Backbone.View.extend({

	initialize:function () {
        this.render();
	    this.editor = [];
	    this.list = ['text', 'opt-1', 'opt-2', 'opt-3', 'opt-4', 'explanation'];
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
    },

    events: {
        'click .edit': 'edit',
        'click .preview': 'preview',
        'click #submit' : 'submit',
        'click #fiximg' : 'fixImages'
    },

    fixImages : function(){
    	var context = this;
    	_.each(this.list,function(item){
    			data = context.editor[item].getData();
    			var a = $("<div>");
    			a.html(data).find("img").each(function(i){
    					currentSrc = $(this).attr("src");
    					newSrc = currentSrc.substr(12);
    					$(this).attr("src",newSrc);
    				});
    			context.editor[item].setData(a.html());
    		});
    },
    edit: function(e){
    	id = ($(e.target).attr("id")).substr(2);
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
    			data = context.editor[item].getData();
	    		context.editor[item].destroy();
	    		$(item).html(data);		
    		});
		data = this.editor[id].getData();
    	this.editor[id].destroy();
    	$(id).html(data);
    },

    submit:  function(e){
    	var data = [];
    	var context = this;
    	_.each(this.list,function(item){
    		data[item] = context.editor[item].getData();
    	});
    	var correctAnswer = "";

    	for(var i =1;i<4;i++)
    		if($("#cbox-opt-"+i)[0].checked)
    				correctAnswer = ((correctAnswer == "")? "" : correctAnswer +"|:") + String(i-1);

    	data["noOfOptions"] = 4;
    	data["correctAnswer"] = correctAnswer;

    	console.log(data);
    	//ajax call to server
    		//fix images, copy them to location with new naming.
    		//l3id,
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});

window.views["questionEdit"] = Backbone.View.extend({

	defaults : {
	},


	initialize:function () {
        this.render();
    },

    events: {
        'click #submit': 'submit'
    },

    submit: function(){

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});