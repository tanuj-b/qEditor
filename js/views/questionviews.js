window.views["questionAdd"] = Backbone.View.extend({

	defaults : {
		editor : null
	},


	initialize:function () {
        this.render();
        CKEDITOR.inline('#text');
        CKEDITOR.inline('#opt-1');
        CKEDITOR.inline('#opt-2');
        CKEDITOR.inline('#opt-3');
        CKEDITOR.inline('#opt-4');
        CKEDITOR.inline('#explanation');
    },

    events: {
        'click #submit': 'submit',
        'click #preview': 'preview',
    },

    submit: function(){

    },

    preview: function(){

    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }
});