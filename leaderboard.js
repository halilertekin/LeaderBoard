//oncelikle veritabanini ayarliyoruz
PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  console.log('helo client');

  Template.leaderboard.helpers({
    'player': function() {
      return PlayersList.find({}, {
        sort: {
          score: -1,
          name: 1
        }
      });
    },
    'showSelectedPlayer': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
    },
    'selectedClass': function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected"
      };
    }
  });
  Template.leaderboard.events({
    'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {
        $inc: {
          score: 5
        }
      });
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {
        $inc: {
          score: -5
        }
      });
    }
  });
  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      PlayersList.insert({
        name: playerNameVar,
        score: 0
      });
    },
    'click a': function(event) {
      event.preventDefault();

    }
  });

};

if (Meteor.isServer) {
  Meteor.startup(function() {
    console.log('server basladi');
  });
}