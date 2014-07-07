Template.chatlist.helpers({
	getChatCount: function(chat_sender) {
		var newchat = Chats.find({sender: chat_sender, recipient: Meteor.user().username, unread: true}, {sort: {created_at: -1}}).fetch();
		if (newchat.length > 0) {
			// should show the number of new chats per user
			return '';
		} else {
			return 'hide';
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
			return (chatStatus == 1 ? 'Online' : (chatStatus == 0 ? 'Away since' : 'Last seen online :'));
		}
	}
})