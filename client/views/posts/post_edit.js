Template.postEdit.helpers({
	post: function() {
		return Posts.findOne(Session.get('currentPostId'));
	},
	editor: function() {
		KindEditor.ready(function(K) {
			K.create('textarea[name="message"]', {
				allowFileManager : true
			});
		});
	},
	showContent: function(){
		var post = Posts.findOne(Session.get('currentPostId'));
		return post.message;
	}
});
Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = Session.get('currentPostId');
		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}
		Posts.update(currentPostId, {
			$set: postProperties
		}, function(error) {
			if (error) {
				// display the error to the user
				alert(error.reason);
			} else {
				Meteor.Router.to('postPage', currentPostId);
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete this post?")) {
			var currentPostId = Session.get('currentPostId');
			Posts.remove(currentPostId);
			Meteor.Router.to('postsList');
		}
	}
});

Template.postEdit.rendered = function() {
	KindEditor.ready(function(K) {
		K.create('textarea[name="message"]', {
			allowFileManager : true
		});
	});
}