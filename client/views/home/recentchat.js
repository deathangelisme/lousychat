Template.recentchat.helpers({
	getRecentChats: function() {
		var user = Meteor.user();
		if(user.chathistory !== undefined) {
			var recentchats = [];
			_.each(user.chathistory, function(partner) {
				var lastchat = Chats.find({
          $or: [
            {$and: [{recipient: partner}, {sender: user.username}]},
            {$and: [{recipient: user.username}, {sender: partner}]},
          ]
        }, {limit: 1, sort: {created_at: -1}}).fetch();

				var msg = lastchat[0].msg.split("<br/>");
        lastchat[0].msg = msg[msg.length-1];

        if(lastchat[0].sender === user.username) lastchat[0].myChat = true;
        recentchats.push(lastchat[0]);
			})
			recentchats = _.sortBy(recentchats, 'created_at');
			return recentchats.reverse();
		}
	},
	formattedDate: function(date) {
		return moment(date).calendar();
		//return moment(date).format('MMM Do, HH:mm');
	}
})