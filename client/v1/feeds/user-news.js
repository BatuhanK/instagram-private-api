var _ = require('lodash');
var util = require('util');
var FeedBase = require('./feed-base');

function NewsFeed(session, limit) {
    console.log(`Session: ${!!session}`);
    this.limit = parseInt(limit) || null;
    FeedBase.apply(this, arguments);
}
util.inherits(NewsFeed, FeedBase);

module.exports = NewsFeed;
var Request = require('../request');
var Helpers = require('../../../helpers');


NewsFeed.prototype.get = function () {
    console.log(this);
    var that = this;
    return this.session.getAccountId()
        .then(function(id) {
            var rankToken = Helpers.buildRankToken(id);
            return new Request(that.session)
                .setMethod('GET')
                .setResource('newsFeed', {
                    maxId: that.getCursor(),
                    rankToken: rankToken
                })
                .send();
        })
        .then(function(data) {
            that.moreAvailable = data.more_available;
            if (that.moreAvailable)
                that.setCursor(data.next_max_id);
        });
};