/**
 * Created by coonrod on 10/17/14.
 */
var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

var filters  = require('../util/filters');

module.exports = Backbone.Router.extend({
    routes: {
        '*filter': 'setFilter'
    },

    setFilter: function (param) {
        filters.TodoFilter = param || '';
        window.app.Todos.trigger('filter');
    },

    start: function(){
        Backbone.history.start();
    }
});
