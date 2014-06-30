Meteor.publish('users', function() {
	return Meteor.users.find({});
})
Meteor.publish('chats', function() {
	return Chats.find({}, {limit: 30});
})