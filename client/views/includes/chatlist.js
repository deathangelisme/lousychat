Template.chatlist.helpers({
	getChatCount: function(chat_sender) {
		// this block gets called multiple times and had some delay
		// should have a better workaround on this one in the future
		if(Meteor.user()) {
			var newchats = Chats.find({recipient: Meteor.user().username, unread: true}, {sort: {created_at: -1}}).fetch();
			// if (newchats.length > 0) {
			// 	if (typeof(newchatsInterval) !== 'undefined') clearInterval(newchatsInterval);
			// 	newchatsInterval = setInterval(function() {
			// 		if(document.title === 'LousyChat') {
			// 			document.title = 'New chats!';
			// 		} else {
			// 			document.title = 'LousyChat';
			// 		}
			// 	}, 1000);
			// } else {
			// 	if (typeof(newchatsInterval) !== 'undefined') clearInterval(newchatsInterval);
			// 	document.title = 'LousyChat';
			// }

			var newchat = Chats.find({sender: chat_sender, recipient: Meteor.user().username, unread: true}, {sort: {created_at: -1}}).fetch();
			if (newchat.length > 0) {
				// should show the number of new chats per user in the future
				return '';
			} else {
				return 'hide';
			}
		}
	},
	userStatus: function(status) {
		switch(status) {
			case 1 :
				return 'online';
				break;
			case 0 :
				return 'away';
				break;
			default :
				return 'offline';
				break;
		}
	},
	isNotOnline: function(hideFlag) {
		if(hideFlag) {
			return (this.profile.chat_status == 1 ? 'hide' : '');
		} else {
			var chatStatus = this.profile.chat_status;
			if(typeof(this.profile.last_login) == 'undefined') return '';
			return (chatStatus == 1 ? 'Online' : (chatStatus == 0 ? 'Away since' : 'Not online since'));
		}
	},
	getOnlineUserCount: function(userslist) {
		var onlineCount = 0;
		_.each(userslist, function(u) {if (u.profile.chat_status === 1) onlineCount += 1});
		return onlineCount;
	}
})