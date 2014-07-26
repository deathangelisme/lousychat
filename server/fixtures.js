if(Meteor.users.find().count() === 0) {
	Accounts.createUser({
		username: "test1",
		password: "hahaha",
		email: "shabriwa.shalat+test1@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined,
		}
	});
	Accounts.createUser({
		username: "test2",
		password: "hahaha",
		email: "shabriwa.shalat+test2@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
	Accounts.createUser({
		username: "test3",
		password: "hahaha",
		email: "shabriwa.shalat+test3@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
	Accounts.createUser({
		username: "test4",
		password: "hahaha",
		email: "shabriwa.shalat+test4@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
	Accounts.createUser({
		username: "test5",
		password: "hahaha",
		email: "shabriwa.shalat+test5@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
	Accounts.createUser({
		username: "test6",
		password: "hahaha",
		email: "shabriwa.shalat+test6@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
	Accounts.createUser({
		username: "test7",
		password: "hahaha",
		email: "shabriwa.shalat+test7@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
	Accounts.createUser({
		username: "test8",
		password: "hahaha",
		email: "shabriwa.shalat+test8@gmail.com",
		chathistory: [],
		profile: {
			chat_status: -1,
			last_login: (new Date()).toISOString(),
			is_typing: undefined,
			is_viewing: undefined
		}
	});
}