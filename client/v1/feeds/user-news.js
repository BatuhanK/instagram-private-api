var Request = require('../request');
var Helpers = require('../../../helpers');

function UserNewsFeed(session, limit) {
    this.session = session;
    this.timeout = 10 * 60 * 1000; // 10 minutes
    this.limit = limit;
}

UserNewsFeed.prototype.get = function () {
    var that = this;
    return this.session.getAccountId()
        .then(function(id) {
            var rankToken = Helpers.buildRankToken(id);
            return new Request(that.session)
                .setMethod('GET')
                .setResource('news', {
                    maxId: that.getCursor(),
                    rankToken: rankToken
                })
                .send()
        });
};

module.exports = UserNewsFeed;