Meteor.publish('users', function() {
	return Meteor.users.find({});
})
Meteor.publish('chats', function() {
	return Chats.find({});
})

Meteor.publish('userChatStatus', function() {
	return Meteor.users.find({_id: this.userId}, {
		fields: {chat_status: 1, is_typing: 1}
	})
})

Meteor.methods({
	updateUserStatus: function(isTyping)  {
		Meteor.users.update(this.userId, {$set: {
			profile: {
				is_typing_to: isTyping
			}
		}})
	}
})