window.views["questionAdd"] = Backbone.View.extend({

	initialize:function () {
        this.render();
	    this.editor = [];
	    this.list = ['text',
	    	'opt-1',
	        'opt-2',
	        'opt-3',
	        'opt-4',
	        'explanation'];
	    var editor = [];
        _.each(this.list,function(item){
        	editor[item] = CKEDITOR.replace(item);
        });
        this.editor = editor;
    },

    events: {
        'click .edit': 'edit',
        'click .preview': 'preview',
        'click #submit' : 'submit'
    },

    edit: function(e){
    	id = ($(e.target).attr("id")).substr(2);
    	this.editor[id] = CKEDITOR.replace(id);
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
    	_.each(this.list,function(item){
    		data[item] = context.editor[item].getData();
    	});
    	//ajax call to server
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