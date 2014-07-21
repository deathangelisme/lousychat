/* TODO
** strip html tags
** user document should be :
** 
**/

Template.chat.helpers({
	sendChatMsg: function() {
		if($('#sendChatInput').val().length > 0) {
			var chatpartner = Meteor.users.findOne({username: Session.get('chatPartner')});
			Meteor.call('insertChat', {
				msg : $('#sendChatInput').val(),
				created_at : (new Date()).toISOString(),
				unread: chatpartner.profile.is_viewing === Meteor.user().username ? (chatpartner.profile.chat_status === 0 ? true : false) : true
			}, chatpartner);
			Meteor.call('updateTypingStatus', undefined);
			$('#sendChatInput').val('');
			Template.chat.refreshChat();
		}
	},
	refreshChat: function() {
		setTimeout(function() {
			$('#userChatCont').scrollTop($('#userChatCont')[0].scrollHeight);
		}, 0);
	},
	isMyChat: function(sender, username) {
		return sender == Meteor.user().username;
	},
	isEmptyChat: function(msg) {
		return msg === '';
	},
	datePlaceholder: function(created_at) {
		return moment(created_at).calendar();
	},
	isPartnerTyping: function() {
		Template.chat.refreshChat();
		if(this.chatpartner[0].profile.is_typing && this.chatpartner[0].profile.is_viewing == Meteor.user().username) {
			return '';
		} else {
			return 'hide';
		}
	},
	formattedDate: function(date) {
		return moment(date).format('HH:mm');
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