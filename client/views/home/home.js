Template.home.helpers({
	gotoNewChat: function() {
		if(Meteor.users.findOne({username: $('#newChatUsername').val()}) !== undefined) {
			Router.go('userchat', {username: $('#newChatUsername').val()});
		} else {
			alert('User not found')
		}
	}
})

Template.home.events({
	'click #newChat' : function(e) {
		aaa = e;
		$(e.target).toggleClass('hide');
		$('#startNewChat').toggleClass('hide');
		$('#newChatUsername').toggleClass('hide');
		$('#chatHistoryCont .title').toggleClass('hide');
	},
	'click #startNewChat' : function() {
		if($('#newChatUsername').val() !== '') Template.home.gotoNewChat();
	},
	'keyup #newChatUsername': function(e) {
		if(e.keyCode == 13 && $(e.target).val() !== '') {
			Template.home.gotoNewChat()
		}
	}
})