/**
 * Created by coonrod on 10/17/14.
 */
//Imports
var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

var ListView        = require('./views/list-view');
var TodoCollection  = require('./collections/todo-collection');
var filters         = require('./util/filters');

module.exports = Backbone.Router.extend({
    todos: new TodoCollection(),
    routes: {
        '*filter': 'setFilter'
    },

    start: function(){
        window.todos = this.todos;
        var view = new ListView({
            el: '#todoapp',
            collection: todos
        });
        view.render();
    },

    setFilter: function (param) {
        filters.TodoFilter = param || '';
        todos.trigger('filter');
    }
});

