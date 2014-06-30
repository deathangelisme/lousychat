Template.chatlist.userStatus = function(status) {
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
}

Template.chatlist.isTheUser = function(username) {
	return username == Meteor.user().username ? 'hide' : ''
}