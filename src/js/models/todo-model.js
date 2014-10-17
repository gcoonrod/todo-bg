/**
 * Created by coonrod on 10/17/14.
 */
var $           = require('jquery');
var Backbone    = require('backbone');
Backbone.$      = $;

module.exports = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    toggle: function() {
        this.save({
            completed: !this.get('completed')
        });
    },

    parse: function(response){
        response.id = response._id;
        return response;
    }
});