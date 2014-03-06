Template.categorySubmit.events({
	'submit form': function(event) {
		event.preventDefault();
		var category = {
			name: $(event.target).find('[name=name]').val(),
			description: $(event.target).find('[name=description]').val()
		}
		Meteor.call('category', category, function(error, id) {
			if (error) {
				// display the error to the user
				throwError(error.reason);
				// if the error is that the category already exists, take us there
				if (error.error === 302)
					Meteor.Router.to('newPosts', error.details)
			} else {
				alert("Success to create a Category !")
				Meteor.Router.to('newPosts', id);
			}
		});
	}
});