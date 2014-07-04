/* TODO :
** enter button submits form
** integrate 'status' user (online, offline, away)
** move Accounts.createUser to server-side
*/

Template.login.events({
	'submit form#loginOrSignup' : function(e) {
		e.preventDefault();
		var form = $(e.target).closest('form').serializeArray();
		if($(e.target).find('button:visible').val() === 'login') {
			Meteor.loginWithPassword(form[0].value, form[1].value, function(result) {
				if(typeof(result) != 'undefined') {
					alert(result.reason)
				} else {
					Meteor.call('updateChatStatus', 1);
				}
			})
		} else {
			if(form[4].value !== form[5].value || form[5].value === '') {
				alert('Passwords don\'t match');
			} else {
				Accounts.createUser({
					username: form[3].value, 
					email: form[2].value, 
					password: form[4].value
				}, 
				function(result) {
					if(typeof(result) != 'undefined') {
						alert(result.reason);
					} else {
						Meteor.call('updateChatStatus', 1);
					}
				});
			}
		}
	},

	'click #signupLink' : function(e) {
		$(e.currentTarget).addClass('hide');
		$("#loginLink").removeClass('hide');
		$('#loginForm').addClass('hide');
		$('#signupForm').removeClass('hide');
	},

	'click #loginLink' : function(e) {
		$(e.currentTarget).addClass('hide');
		$("#signupLink").removeClass('hide');
		$('#loginForm').removeClass('hide');
		$('#signupForm').addClass('hide');
	}
})

// bind DOM events here
Template.login.rendered = function() {
}