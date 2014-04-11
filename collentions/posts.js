Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

/*Posts.deny({
	update: function(userId, post, fieldNames) {
		// may only edit the following three fields:
		console.log(fieldNames);
		return (_.without(fieldNames, 'title').length > 0);
	}
});*/

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user(),
			postWithSameLink = Posts.findOne({
				url: postAttributes.url
			});
		var category = Categorys.findOne(postAttributes.categoryId);
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post new stories");
		// ensure the post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, 'Please fill in a headline');
		if (!postAttributes.categoryId)
			throw new Meteor.Error(422, 'You must post on a category');
		// check that there are no previous posts with the same link
		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302,
				'This link has already been posted',
				postWithSameLink._id);
		}

		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'categoryId', 'url', 'title', 'content'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			commentsCount: 0,
			upvoters: [],
			votes: 0
		});

		// update the post with the number of comments
		Categorys.update(post.postId, {
			$inc: {
				postsCount: 1
			}
		});

		var postId = Posts.insert(post);
		return postId;

	},
	upvote: function(postId) {
		var user = Meteor.user();
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to upvote");
		Posts.update({
			_id: postId,
			upvoters: {
				$ne: user._id
			}
		}, {
			$addToSet: {
				upvoters: user._id
			},
			$inc: {
				votes: 1
			}
		});
	}
});