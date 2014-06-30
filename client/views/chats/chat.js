/* TODO
** strip html tags
**/

function sendChatMsg() {
	if($('#sendChatInput').val().length > 0) {
		Chats.insert({
		sender : Meteor.user().username, 
		recipient : Session.get('chatPartner'), 
		msg : $('#sendChatInput').val(),
			created_at : (new Date()).toISOString()
		});
		Template.chat.refreshChat();
	}
}

Template.chat.refreshChat = function() {
	setTimeout(function() {
		$('#sendChatInput').val('');
		$('#userChatCont').scrollTop($('#userChatCont')[0].scrollHeight);
	}, 100);
}

Template.chat.isMyChat = function(sender, username) {
	return sender == Meteor.user().username;
}

Template.chat.get_human_date = function () {
  return Date(this.created_at).toString();
};

Template.chat.events({
	'click #sendChatBtn' : function() {
		sendChatMsg()
	},
	'keypress #sendChatInput' : function(e) {
		if(e.keyCode == 13) {
			sendChatMsg()
		}
	}
})

Template.chat.rendered = function() {
	refreshChat();
}