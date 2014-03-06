Categorys = new Meteor.Collection('categorys');

Categorys.allow({
	update: ownsDocument,
	remove: ownsDocument
});

/*
Categorys.deny({
	update: function(userId, category, fieldNames) {
		// may only edit the following three fields:
		return (_.without(fieldNames, 'name').length > 0);
	}
});*/

Meteor.methods({
	category: function(categoryAttributes) {
		var user = Meteor.user(),
			categoryWithSameName = Categorys.findOne({
				name: categoryAttributes.name
			});
		// ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to category new stories");
		// check that there are no previous Categorys with the same name
		if (categoryAttributes.name && categoryWithSameName) {
			throw new Meteor.Error(302,
				'This name has already been categoryed',
				categoryWithSameName._id);
		}
		// pick out the whitelisted keys
		var category = _.extend(_.pick(categoryAttributes, 'name', 'description'), {
			userId: user._id,
			author: user.username,
			postsCount: 0,
		});
		var categoryId = Categorys.insert(category);
		return categoryId;
	}
});