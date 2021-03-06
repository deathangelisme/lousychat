Template.navbar.helpers({
	getNewChats: function() {
		if(Meteor.user()) {
			var newchats = Chats.find({
				recipient: Meteor.user().username,
				unread: true
			}, {
				sort: {created_at: -1}
			}).fetch()

			if(newchats.length > 0) {
				$('.navbar-brand span:last').addClass('newchat animated bounce');
				Session.set('hasUnreadChats', true);
			} else {
				Session.set('hasUnreadChats', false);
				$('.navbar-brand span:last').removeClass('newchat animated bounce');
			}
		}
	},
	rendered: function() {
		Deps.autorun(function() {
			Template.navbar.getNewChats();
		})
	}
})