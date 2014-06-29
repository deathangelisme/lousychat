Router.configure({
  layoutTemplate: 'layout',
  // loadingTemplate: 'loading',
  // waitOn: function() { 
  //   return [Meteor.subscribe('notifications')]
  // }
});

ChatController = RouteController.extend({
  template: 'chatroom',
  waitOn: function() {
    return Meteor.subscribe('users')
  },
  data: function() {
    return {
      userslist: Meteor.users.find({}).fetch()
    }
  }
})

Router.map( function () {
	this.route('home', {
	  path: '/',
    controller : 'ChatController'
	});

  this.route('profile', {
    path: '/profile'
  });

  this.route('settings', {
    path: '/settings'
  });

  this.route('logout', {
    path: '/logout',
    action: function() {
      // setUserStatus(Meteor.user()._id, 'offline');
      Meteor.logout();
      this.redirect('/');
    }
  })

	this.route('createNotif', {
		path: '/create',
		where: 'server',
		action: function () {
			//Notifications.insert({name: this.params.lat+","+this.params.lon});
			Notifications.insert({name: this.request.body.lat+","+this.request.body.lon});
      // var filename = this.params.filename; // for params such as GET
      // resp = {'lat' : this.request.body.lat, // for request body such as POST
      //         'lon' : this.request.body.lon};
      // this.response.writeHead(200, {'Content-Type': // for writing responses such as JSON
      //                               'application/json; charset=utf-8'});
      // this.response.end(JSON.stringify(resp)); // End-of-response to JSON
    }
	})
})