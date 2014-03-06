Meteor.publish('categorys', function() {
	return Categorys.find({
		userId: this.userId
	});
});
Meteor.publish('posts', function(categoryId) {
	return Posts.find({}, {
		categoryId : categoryId,
		sort: {
			submitted: -1
		}
	});
});
Meteor.publish('comments', function(postId) {
	return Comments.find({
		postId: postId
	});
});
Meteor.publish('notifications', function() {
	return Notifications.find({
		userId: this.userId
	});
});
Meteor.publish('newPosts', function(categoryId) {
	return Posts.find({}, {
		categoryId : categoryId
	});
});
Meteor.publish('topPosts', function(categoryId) {
	return Posts.find({}, {
		categoryId : categoryId
	});
});
Meteor.publish('singlePost', function(id) {
	return id && Posts.find(id);
});