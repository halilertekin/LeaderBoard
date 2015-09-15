//oncelikle veritabanini ayarliyoruz
PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  // counter starts at 0
  console.log('helo client');

  Template.leaderboard.helpers({
    'player': function () {
      return PlayersList.find();
    },
    'selectedClass' : function () {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if (playerId == selectedPlayer) {
        return "selected"
      };
  }
});
  Template.leaderboard.events({
    'click': function () {
      console.log("click eventine basildi");
    },
    'click .player' : function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    }
  });

};

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('server basladi');
  });
}
