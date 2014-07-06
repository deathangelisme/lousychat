Meteor.publish('users', function() {
	return Meteor.users.find({});
})
Meteor.publish('chats', function() {
	return Chats.find({});
})

Meteor.publish('notifications', function() {
	return Notifications.find({});
})

Meteor.methods({
	updateTypingStatus: function(isTyping)  {
		Meteor.users.update(this.userId, {$set: {
			'profile.is_typing' : isTyping
			}
		})
	},
	updateViewingStatus: function(isViewing)  {
		Meteor.users.update(this.userId, {$set: {
			'profile.is_viewing' : isViewing
			}
		})
	},
	updateChatStatus: function(chatStatus)  {
		var chatStatusObj = (chatStatus != 1 ? { // don't record last login if it's changed to online
			'profile.chat_status': chatStatus,
			'profile.last_login': (new Date()).toISOString()
		} : {
			'profile.chat_status': chatStatus
		});

		Meteor.users.update(this.userId, {$set: chatStatusObj})
	},
	createAndValidateUser: function(form) {
		if(form[4].value !== form[5].value || form[5].value === '') {
			return 'Passwords don\'t match';
		}
		Accounts.createUser({
			username: form[2].value, 
			email: form[3].value, 
			password: form[4].value,
			profile: {
					chat_status: 1,
					is_typing_to: undefined,
					last_login: (new Date()).toISOString()
				}
			}, 
		function(result) {
			if(typeof(result) != 'undefined') {
				return result.reason;
			} else {
				return undefined;
			}
		});
	},
	readAllChats: function(chat_sender) {
		var user = Meteor.users.findOne(this.userId);
		Chats.update({sender: chat_sender, recipient: user.username}, {$set: {unread: false}}, {multi: true})
	},
	updateOnRevisit: function() {
		var user = Meteor.users.findOne(this.userId);
		if (user !== undefined) {
			if (user.profile.chat_status === 0) Meteor.call('updateChatStatus', 1);
		}
	}
})