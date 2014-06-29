/* TODO
** consider restricting inserts using Meteor.allow/deny
** strip html tags for text areas
*/

Meteor.subscribe('chats');

Template.chats.chatentries = function() {
		return Chats.find({}).fetch();
}

Template.chats.events({
	'click #sendChatBtn' : function() {
		if($("#chatTextarea").val().length > 0) {
			Chats.insert({chatname: Meteor.user().username, chatmsg: $("#chatTextarea").val()});
			$("#chatTextarea").val("");
			$("#chatsCont").scrollTop(9999);
		}
	}
})