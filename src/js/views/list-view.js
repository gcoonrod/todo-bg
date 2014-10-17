/**
 * Created by coonrod on 10/17/14.
 */
var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
Backbone.$      = $;

var TodoView    = require('./todo-view');
var filters     = require('../util/filters');
var constants   = require('../util/constants');

module.exports = Backbone.View.extend({
    el: '#todoapp',
    statsTemplate: _.template( $('#stats-template').html() ),

    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function () {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        this.listenTo(window.todos, 'add', this.addOne);
        this.listenTo(window.todos, 'reset', this.addAll);
        this.listenTo(window.todos, 'change:completed', this.filterOne);
        this.listenTo(window.todos, 'filter', this.filterAll);
        this.listenTo(window.todos, 'all', this.render);

        window.todos.fetch();
    },

    render: function () {
        var completed = window.todos.completed().length;
        var remaining = window.todos.remaining().length;

        if (window.todos.length) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (filters.TodoFilter || '') + '"]')
                .addClass('selected');
        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    addOne: function (todo) {
        var view = new TodoView({model: todo});
        $('#todo-list').append(view.render().el);
    },

    addAll: function () {
        this.$('#todo-list').html('');
        window.todos.each(this.addOne, this);
    },

    filterOne: function (todo) {
        todo.trigger('visible');
    },

    filterAll: function () {
        window.todos.each(this.filterOne, this);
    },

    newAttributes: function () {
        return {
            title: this.$input.val().trim(),
            order: window.todos.nextOrder(),
            completed: false
        };
    },

    createOnEnter: function (event) {
        if(event.which !== constants.ENTER_KEY || !this.$input.val().trim()){
            return;
        }

        window.todos.create(this.newAttributes());
        this.$input.val('');
    },

    clearCompleted: function () {
        _.invoke(window.todos.completed(), 'destroy');
        return false;
    },

    toggleAllComplete: function () {
        var completed = this.allCheckbox.checked;

        window.todos.each(function (todo) {
            todo.save({
                'completed': completed
            });
        });
    }
});