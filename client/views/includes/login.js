/* TODO :
** enter button submits form
** integrate 'status' user (online, offline, away)
** move Accounts.createUser to server-side
*/

Template.login.events({
	'click #loginBtn' : function() {
		Meteor.loginWithPassword($('#loginForm input[name="usercreds"]').val(), $('#loginForm input[name="password"]').val(), function(result) {
			if(typeof(result) != 'undefined') {
				alert(result.reason);
			} else {
				$('#login').modal('hide');
				// setUserStatus(Meteor.user()._id, 'online');
			}
		});
	},

	'click #signupBtn' : function() {
		if($('#signupForm input[name="password"]').val() == $('#signupForm input[name="password-confirmation"]').val() && $('#signupForm input[name="password"]').val().length != 0) {
			Accounts.createUser({
				username: $('#signupForm input[name="username"]').val(), 
				email: $('#signupForm input[name="email"]').val(), 
				password: $('#signupForm input[name="password"]').val()
				}, 
			function(result) {
				if(typeof(result) != 'undefined') {
					alert(result.reason);
				} else {
					$('#login').modal('hide');
					// setUserStatus(Meteor.user()._id, 'online');
				}
			});
		} else {
			alert('Passwords don\'t match');
		}
	},

	'click #signupLink' : function(e) {
		$(e.currentTarget).addClass('hide');
		$('#loginForm').addClass('hide');
		$('#signupForm').removeClass('hide');
	}
})

// bind DOM events here
Template.login.rendered = function() {
	$('#login').on('hidden.bs.modal', function () {
		$(this).find('form')[0].reset();
		$(this).find('#signupForm').addClass('hide');
		$(this).find('#loginForm').removeClass('hide');
		$(this).find('#signupLink').removeClass('hide');
	})
}