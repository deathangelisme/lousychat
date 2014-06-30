if(Meteor.users.find().count() === 0) {
	Accounts.createUser({
		username: "test1",
		password: "hahaha",
		email: "shabriwa.shalat+test1@gmail.com",
		profile: {
			status: -1
		}
	});
	Accounts.createUser({
		username: "test2",
		password: "hahaha",
		email: "shabriwa.shalat+test2@gmail.com",
		profile: {
			status: -1
		}
	});
	Accounts.createUser({
		username: "test3",
		password: "hahaha",
		email: "shabriwa.shalat+test3@gmail.com",
		profile: {
			status: -1
		}
	});
}