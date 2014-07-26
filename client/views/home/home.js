Template.home.helpers({
	hasChatHistory: function() {
		return Meteor.user().chathistory !== undefined
	},
	hasUnreadChats: function() {
		return Session.get('hasUnreadChats');
	}
})

Template.home.events({
	'click #readAllChats' : function() {
		Meteor.call('readAllChats');
	}
})