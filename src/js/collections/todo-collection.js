/**
 * Created by coonrod on 10/17/14.
 */
var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

var TodoModel   = require('../models/todo-model');

module.exports = Backbone.Collection.extend({
    model: TodoModel,
    url: '/api/todos',
    //localStorage: new Backbone.LocalStorage('todos-backbone'),
    //localStorage: true,

    completed: function () {
        return this.filter(function (todo) {
            return todo.get('completed');
        });
    },

    remaining: function () {
        return this.without.apply(this, this.completed());
    },

    nextOrder: function () {
        if (!this.length) {
            return 1;
        }
        return this.last().get('order') + 1;
    },

    comparator: function (todo) {
        return todo.get('order');
    }
});

//app.Todos = new TodoList();
