var _ = require('lodash');
var Request = require('../request');
var Media = require('../media');

function AccountStory(session, accountId) {
    this.session = session;
    this.accountId = accountId;
}

AccountStory.prototype.get = function () {
    var that = this;
    return new Request(that.session)
        .setMethod('GET')
        .setResource('storyFeed', {
            id: that.accountId,
            maxId: that.cursor,
            rankToken: Helpers.generateUUID()
        })
        .send()
        .then(function(data) {
          if(!data.reel) return;
          return _.map(data.reel.items, function (medium) {
              return new Media(that.session, medium);
            });
        });
};

module.exports = AccountStory;