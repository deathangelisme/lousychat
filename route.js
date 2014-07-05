/* TODO
** tidying up da code
**/

Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  // waitOn: function() { 
  //   return [Meteor.subscribe('notifications')]
  // }
});

var beforeHooks = {
  windowListener: function() {
    if (Meteor.user()) {
      if(Meteor.user().profile.chat_status === 0 && Session.get('isWindowHidden') === undefined) Meteor.call('updateChatStatus', 1);
      addHiddenWindowListener();
      addCloseWindowListener();
    }
  }
}

Router.onBeforeAction(beforeHooks.windowListener);

Router.map( function () {
	this.route('home', {
	  path: '/',
    waitOn: function() {
      return Meteor.subscribe('users');
    },
    data: function() {
      return {
        userslist: (Meteor.userId() ? Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch() : Meteor.users.find({}).fetch())
      };
    }
	});

  this.route('chat', {
    path: '/chat',
    action: function() {
      this.redirect('/'); // need to do more clever thing here
    }
  })

  this.route('userchat', {
    path: '/chat/:username',
    template: 'chat',
    waitOn: function() {
      return [Meteor.subscribe('users'), Meteor.subscribe('chats')]
    },
    data: function() {
      return {
        userslist: (Meteor.userId() ? Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch() : Meteor.users.find({}).fetch()),
        chatpartner: Meteor.users.find({username: this.params.username}).fetch(),
        userchats: Chats.find({
          $or: [
            {$and: [{recipient: this.params.username}, {sender: Meteor.user().username}]},
            {$and: [{recipient: Meteor.user().username}, {sender: this.params.username}]},
          ]
        }).fetch(),
        username: this.params.username
      }
    },
    action: function() {
      Session.set('chatPartner', this.params.username);
      this.render();
    }
  });

  this.route('settings', {
    path: '/settings'
  });

  this.route('logout', {
    path: '/logout',
    action: function() {
      Meteor.call('updateChatStatus', -1);
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