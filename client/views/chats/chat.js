/* TODO
** strip html tags
** user document should be :
** 
**/

Template.chat.helpers({
	sendChatMsg: function() {
		if($('#sendChatInput').val().length > 0) {
			var chatpartner = Meteor.users.findOne({username: Session.get('chatPartner')});
			aaa = chatpartner;
			Chats.insert({
				sender : Meteor.user().username, 
				recipient : Session.get('chatPartner'), 
				msg : $('#sendChatInput').val(),
				created_at : (new Date()).toISOString(),
				unread: chatpartner.profile.is_viewing === Meteor.user().username ? false : true
			});
			Meteor.call('updateTypingStatus', undefined);
			$('#sendChatInput').val('');
			Template.chat.refreshChat();
		}
	},
	refreshChat: function() {
		setTimeout(function() {
			$('#userChatCont').scrollTop($('#userChatCont')[0].scrollHeight);
		}, 100);
	},
	isMyChat: function(sender, username) {
		return sender == Meteor.user().username;
	},
	get_human_date: function () {
  	return Date(this.created_at).toString();
	},
	isPartnerTyping: function() {
		if(this.chatpartner[0].profile.is_typing && this.chatpartner[0].profile.is_viewing == Meteor.user().username) {
			return this.chatpartner[0].username + " is typing....";
		} else {
			return this.chatpartner[0].username;
		}
	},
	rendered: function() {
		Template.chat.refreshChat();
	}
})

Template.chat.events({
	'click #sendChatBtn' : function() {
		Template.chat.sendChatMsg();
	},
	'keyup #sendChatInput' : function(e) {
		if(e.keyCode == 13) {
			Template.chat.sendChatMsg()
		}

		if($("#sendChatInput").val().length > 0) {
			Meteor.call('updateTypingStatus', true);
		} else {
			Meteor.call('updateTypingStatus', undefined);
		}
	},
})
