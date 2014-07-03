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

Template.chatlist.isNotOnline = function(hideFlag) {
	if(hideFlag) {
		return (this.profile.chat_status == 1 ? 'hide' : '');
	} else {
		var chatStatus = this.profile.chat_status;
		if(typeof(this.profile.last_login) == 'undefined') return '';
		return (chatStatus == 1 ? 'Online' : (chatStatus == 0 ? 'Away since' : 'Last seen online :'));
	}
}