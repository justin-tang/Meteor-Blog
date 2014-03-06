Template.header.helpers({
	activeRouteClass: function( /* route names */ ) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		var active = _.any(args, function(name) {
			return location.pathname === Meteor.Router[name + 'Path']();
		});
		return active && 'active';
	},
	editor: function() {
		KindEditor.ready(function(K) {
			K.create('textarea[name="message"]', {
				allowFileManager : true
			});
		});
	}
});

Template.header.rendered = function() {
	KindEditor.ready(function(K) {
		K.create('textarea[name="message"]', {
			allowFileManager : true
		});
	});
}