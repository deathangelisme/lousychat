/* TODO
** tidying up da code
**/

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    Meteor.subscribe('newchats')
  },
  data: function() {
    return {
      newchats: Chats.find({}).fetch()
    }
  }
});

var beforeHooks = {
  windowListener: function() {
    /* Issue #13
    ** Calling Meteor.user() on beforeHooks caused unexpected result
    ** Use case :
    ** - Logged in using test1, logged out shortly after that
    ** - Logged in using test2, the users list showing wrong list (test2 and test3)
    ** - When logged out, the loading halted and goes freeze
    ** The fix (#16) is doing the checking for the Meteor.user() on server side
    ** There should be a better workaround for this in the future
    ** Needs further inspection on this problem
    */
    if (Session.get('isWindowHidden') === undefined) {
      Meteor.call('updateOnRevisit');
    }
    addHiddenWindowListener();
    addCloseWindowListener();
  }
}

Router.onBeforeAction(beforeHooks.windowListener);

Router.map( function () {
	this.route('home', {
	  path: '/',
    waitOn: function() {
      return [Meteor.subscribe('users'), Meteor.subscribe('chats')];
    },
    data: function() {
      return {
        userslist: (Meteor.userId() ? Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch() : Meteor.users.find({}).fetch())
      };
    },
    action: function() {
      if(Meteor.user()) Meteor.call('updateViewingStatus', undefined);
      this.render();
    }
	});

  // *** ROUTE 'chat'
  // * displays chat interface without params
  // * should be checked for login

  this.route('chat', {
    path: '/chat',
    action: function() {
      this.redirect('/'); // redirected when there's no params match the username
    }
  })

  // *** ROUTE 'userchat'
  // * displays chat interface between users
  // * should be checked for login

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
      Meteor.call('updateViewingStatus', this.params.username);
      Meteor.call('readAllChats', this.params.username);
      this.render();
    }
  });

  // *** ROUTE 'settings'
  // * displays settings
  // * WIP
  // * should be checked for login

  this.route('settings', {
    path: '/settings'
  });

  this.route('logout', {
    path: '/logout',
    action: function() {
      Meteor.call('updateChatStatus', -1);
      Meteor.call('updateViewingStatus', undefined);
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