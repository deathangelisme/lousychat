
// to be moved to router
function sendChatMsg(sender, recipient, msg) {
	Chats.insert({
		sender : Meteor.user().username, 
		recipient : Session.get('chatPartner'), 
		msg : $("#sendChatInput").val(),
		created_at : (new Date()).toISOString()
	});
	refreshChat();
}

refreshChat = function() {
	Meteor.defer(function() {
		$("#sendChatInput").val("");
		$("#userChatCont").scrollTop(999999);
	})
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