Template.newchat.helpers({
	getRandomuser: function() {
    var chathistory = Meteor.user().chathistory || [];
    if(Session.get('randomuser') !== undefined) chathistory.push(Session.get('randomuser')[0].username);
    chathistory.push(Meteor.user().username);
    var users = Meteor.users.find({username : {
    	$nin: chathistory
    }}).fetch();
    return [users[Math.floor(Math.random()*users.length)]];
	},
	randomuser: function() {
		return Session.get('randomuser');
	},
	gotoNewChat: function(text) {
		if(Meteor.users.findOne({username: text}) !== undefined) {
			Router.go('userchat', {username: text});
		} else {
			$('#chatByUsernameCont .alert').removeClass('hide').html('User not found.');
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
			return (chatStatus == 1 ? 'Online' : (chatStatus == 0 ? 'Away since' : 'Offline since'));
		}
	},
	rendered: function() {
		$('#randomUser').addClass('hide');
		$('#loadingRandom').removeClass('hide');
		setTimeout(function() {
			$('#loadingRandom').addClass('hide');
			Session.set('randomuser', Template.newchat.getRandomuser());
		}, 2000)
	}
})

Template.newchat.events({
	'click #usernameSubmit' : function() {
		var input = $("#usernameInput");
		if(input.val() !== '' && input.val() !== Meteor.user().username) {
			Template.newchat.gotoNewChat(input.val())
		}
	},
	'keyup #usernameInput' : function(e) {
		if(e.keyCode === 13 && $(e.target).val() !== '' && $(e.target).val() !== Meteor.user().username) {
			Template.newchat.gotoNewChat($(e.target).val())
		}
	},
	'click #anotherRandom a' : function() {
		$('#randomUser').addClass('hide');
		$('#loadingRandom').removeClass('hide');
		setTimeout(function() {
			$('#loadingRandom').addClass('hide');
			Session.set('randomuser', Template.newchat.getRandomuser());
		}, 2000)
	}
})