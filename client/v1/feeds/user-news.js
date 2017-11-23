var _ = require('lodash');
var util = require('util');
var FeedBase = require('./feed-base');

function UserNewsFeed(session, limit) {
    this.timeout = 10 * 60 * 1000; // 10 minutes
    this.limit = limit;
    FeedBase.apply(this, arguments);
}
util.inherits(UserNewsFeed, FeedBase);

module.exports = UserNewsFeed;
var Request = require('../request');
var Helpers = require('../../../helpers');


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
