Template.postEdit.helpers({
	post: function() {
		return Posts.findOne(Session.get('currentPostId'));
	},
	editor: function() {
		KindEditor.ready(function(K) {
			K.create('textarea[name="content"]', {
				allowFileManager : true
			});
		});
	},
	showContent: function(){
		var post = Posts.findOne(Session.get('currentPostId'));
		return post.content;
	},
	categorys: function(){
		return Categorys.find();
	},
	ownCategory: function(){
		var post = Posts.findOne(Session.get('currentPostId'));
		return this._id == post.categoryId;
	}
});
Template.postEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		var currentPostId = Session.get('currentPostId');
		var postProperties = {
			title: $(event.target).find('[name=title]').val(),
			categoryId: $(event.target).find('[name=category]').val(),
			content: $(event.target).find('[name=content]').val()
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
		K.create('textarea[name="content"]', {
			allowFileManager : true
		});
	});
}