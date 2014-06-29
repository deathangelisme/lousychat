setUserStatus = function(userId, userStatus, callback) {
	switch(userStatus) {
		case 'online' :
			userStatus = 1;
			break;
		case 'away' :
			userStatus = 0;
			break;
		default:
			userStatus = -1;
			break;
	}

	return Meteor.users.update(
		userId,
		{$set: {profile: {status : userStatus}}},
		function(args) {
			return args;
		}
	);
}