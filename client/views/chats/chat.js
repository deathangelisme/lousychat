/* TODO
** strip html tags
** user document should be :
** 
**/

Template.chat.helpers({
	sendChatMsg: function() {
		if($('#sendChatInput').val().length > 0) {
			Chats.insert({
			sender : Meteor.user().username, 
			recipient : Session.get('chatPartner'), 
			msg : $('#sendChatInput').val(),
				created_at : (new Date()).toISOString()
			});
			Meteor.call('updateUserStatus', undefined);
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
	isTyping: function() {
		if(Session.get('isTyping')) {
			return 'yes';
		} else {
			return 'no';
		}
	},
	get_human_date: function () {
  	return Date(this.created_at).toString();
	},
	isPartnerTyping: function() {
		bro = this;
		if(this.chatpartner[0].profile.is_typing_to == Meteor.user().username) {
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
			Meteor.call('updateUserStatus', Session.get('chatPartner'));
		} else {
			Meteor.call('updateUserStatus', undefined);
		}
	},
})
