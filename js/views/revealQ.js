window.views["revealQ"] = Backbone.View.extend({

	initialize:function () {
        this.render();
	    this.editors = [];
	    this.prePreview = [];
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
        //this.model.set('editors', editor);
    },

    events: {
        'click .edit': 'edit',
        'click .preview': 'preview',
        'click #submit' : 'submit',
        'click #fiximg' : 'fixImages'
    }
});