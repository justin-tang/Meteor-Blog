Template.categoryList.helpers({
	categorys: function() {
		return Categorys.find();
	},
	activeCategoryClass: function(name) {
		if(name === 'home'){
			active = (location.pathname === Meteor.Router[name + 'Path']());
		}else{
			active = (location.pathname === '/'+name);
		}
		return active && 'active';
	},
	activeRouteClass: function( /* route names */ ) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		var active = _.any(args, function(name) {
			return location.pathname === Meteor.Router[name + 'Path']();
		});
		return active && 'active';
	}
});
Template.categoryPosts.helpers({
	options: function() {
		if(Session.get('currentCategoryId')){
			var currentCategoryId = Session.get('currentCategoryId');
		}
		return {
			sort: {
				submitted: -1
			},
			categoryId: currentCategoryId,
			handle: newPostsHandle
		}
	}
})