var Request = require('../request');
var Helpers = require('../../../helpers');

function UserNewsFeed(session, limit) {
    this.timeout = 10 * 60 * 1000; // 10 minutes
    this.limit = limit;
    FeedBase.apply(this, arguments);
}

util.inherits(UserNewsFeed, FeedBase);

UserNewsFeed.prototype.get = function () {
    var that = this;
    var rankToken = Helpers.buildRankToken(id);
    return new Request(that.session)
        .setMethod('GET')
        .setResource('news', {
            maxId: that.getCursor(),
            rankToken: rankToken
        })
        .send()
};

module.exports = UserNewsFeed;