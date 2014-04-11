Template.postSubmit.events({
	'submit form': function(event) {
		event.preventDefault();
		var post = {
			title: $(event.target).find('[name=title]').val(),
			categoryId: $(event.target).find('[name=category]').val(),
			content: $(event.target).find('[name=content]').val()
		}
		Meteor.call('post', post, function(error, id) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
				// if the error is that the post already exists, take us there
				if (error.error === 302)
					Meteor.Router.to('postPage', error.details)
			} else {
				Meteor.Router.to('postPage', id);
			}
		});
	}
});

Template.postSubmit.helpers({
	editor: function() {
		KindEditor.ready(function(K) {
			K.create('textarea[name="content"]', {
				allowFileManager : true
			});
		})
	},
	categorys: function(){
		return Categorys.find();
	}
});

Template.postSubmit.rendered = function() {
	KindEditor.ready(function(K) {
		K.create('textarea[name="content"]', {
			allowFileManager : true
		});
	});
}