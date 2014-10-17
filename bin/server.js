/**
 * Created by coonrod on 10/16/14.
 */
var application_root = __dirname,
    express         = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    errorHandler    = require('errorhandler'),
    path            = require('path'),
    mongoose        = require('mongoose');

var mode_arg = process.argv[2];

var mode = function(arg){
  switch (arg) {
      case  "dev":
          return "../src";
      case "prod":
          return "../dist";
      default:
          console.log("You must supply a mode!");
  }
};

var app = express();
var router = express.Router();

mongoose.connect('mongodb://localhost/todos_database');

var Todo = new mongoose.Schema({
    title: String,
    completed: Boolean
});

var TodoModel = mongoose.model('Todo', Todo);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(application_root, mode(mode_arg))));
app.use(errorHandler({dumpExceptions: true, showStack: true}));

router.get('/api', function(req, res){
    res.send('Todos api is running!');
});

router.get('/api/todos', function (req, res) {
    return TodoModel.find(function(err, todos){
        if(!err){
            return res.send(todos);
        } else {
            return console.log(err);
        }
    });
});

router.get('api/todos/:id', function(req, res){
    return TodoModel.findById(req.params.id, function(err, todo){
        if(!err){
            return res.send(todo);
        } else {
            return console.log(err);
        }
    });
});

router.put('/api/todos/:id', function(req, res){
    console.log("Updating Todo " + req.body.title);
    return TodoModel.findById(req.params.id, function(err, todo){
        todo.title = req.body.title;
        todo.completed = req.body.completed;

        return todo.save(function(err){
            if(!err){
                console.log("todo updated");
            } else {
                console.log(err);
            }
            return res.send(err);
        });
    });
});

router.post('/api/todos', function(req, res){
    var todo = new TodoModel({
        title: req.body.title,
        completed: req.body.completed
    });
    todo.save(function(err){
        if(!err){
            return console.log('created');
        } else {
            return console.log(err);
        }
    });
    return res.send(todo);
});

router.delete('/api/todos/:id', function(req, res){
    console.log("Deleting todo with id: " + req.params.id);
    return TodoModel.findById(req.params.id, function(err, todo){
        return todo.remove(function(err){
            if(!err){
                console.log("todo removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});

app.use('/', router);

var port = 4711;
app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
    console.log("Serving files from %s", mode(mode_arg));
});