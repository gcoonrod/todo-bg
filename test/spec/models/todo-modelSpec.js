/**
 * Created by coonrod on 10/20/14.
 */
var TodoModel = require('../../../src/js/models/todo-model');

describe('A Todo Model', function(){
    var MOCK = {
        title: "Test",
        completed: false
    };

    it('should be able to create its application test objects', function(){
        var todo = new TodoModel();
        expect(todo).toBeDefined();
    });

    describe('Have the mock value', function(){
        var todo = new TodoModel(MOCK);
        console.log(todo);

        it('for title', function(){
            expect(todo.attributes.title).toEqual("Test");
        });

        it('for completed', function(){
            expect(todo.attributes.completed).toEqual(false);
        });
    });
});
