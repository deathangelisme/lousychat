if(Meteor.users.find().count() === 0) {
	Accounts.createUser({
		username: "test1",
		password: "hahaha",
		email: "shabriwa.shalat+test1@gmail.com",
		profile: {
			chat_status: -1,
			is_typing_to: undefined
		}
	});
	Accounts.createUser({
		username: "test2",
		password: "hahaha",
		email: "shabriwa.shalat+test2@gmail.com",
		profile: {
			chat_status: -1,
			is_typing_to: undefined
		}
	});
	Accounts.createUser({
		username: "test3",
		password: "hahaha",
		email: "shabriwa.shalat+test3@gmail.com",
		profile: {
			chat_status: -1,
			is_typing_to: undefined
		}
	});
}