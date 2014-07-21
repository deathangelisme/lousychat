Meteor.publish('users', function() {
	return Meteor.users.find({});
})
Meteor.publish('chats', function() {
	return Chats.find({});
})

Meteor.publish('newchats', function() {
	var user = Meteor.users.findOne(this.userId);
	return Chats.find({recipient: user.username, unread: true});
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
			chathistory: [],
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
	},
	insertChat: function(chatobj, partner) {
		var user = Meteor.users.findOne(this.userId);
		var lastchat = Chats.find({
          $or: [
            {$and: [{recipient: partner.username}, {sender: user.username}]},
            {$and: [{recipient: user.username}, {sender: partner.username}]},
          ]
        }, {limit: 1, sort: {created_at: -1}}).fetch();

		// define the time gap to either update or add new chat
		var timeGap = function() {
			if(lastchat.length === 0) { // no recent chats before, create instead update
				return 1;
			} else {
				var gap = Math.floor(moment().diff(moment(lastchat[0].created_at))/60000); // get time gap between now and last chat in ms
				if(gap > 0) { 	// means if the last chat was dated 1 minutes earlier or more
					return gap;   		// create instead update
				} else {
					return 0; // update
				}
			}
		}

		if(lastchat.length === 0 || lastchat[0].recipient === user.username || timeGap() > 0) {

			var created_at = moment();

			// if the last message was 10 minutes ago, add a placeholder
			if(timeGap() > 10 || lastchat.length === 0) {
				Chats.insert({
					sender: user.username,
					recipient: partner.username,
					msg: '',
					created_at: moment().toISOString(), // to be changed using server-side date creation or from Meteor.allow
					unread: chatobj.unread
				});

				// to avoid updating the wrong one
				created_at.add(1, 'second');
			}

			// the last chat between user and partner is empty or the chat is from the partner
			Chats.insert({
				sender: user.username,
				recipient: partner.username,
				msg: chatobj.msg,
				created_at: created_at.toISOString(), // to be changed using server-side date creation or from Meteor.allow
				unread: chatobj.unread
			});
		} else {
			// the last chat is from user, so instead of inserting a new one, update the last one
			Chats.update(lastchat[0]._id, {$set: {
				msg: lastchat[0].msg+"<br/>"+chatobj.msg,
				created_at: chatobj.created_at,
				unread: chatobj.unread
			}});
		}

		// update own chat history
		if(_.indexOf(user.chathistory, partner.username) < 0) {
			Meteor.users.update(this.userId, {$push: 
				{
					chathistory: partner.username
				}
			})
		}

		// update partner chat history
		if(_.indexOf(partner.chathistory, user.username) < 0) {
			Meteor.users.update(partner._id, {$push: 
				{
					chathistory: user.username
				}
			})
		}
	}
})