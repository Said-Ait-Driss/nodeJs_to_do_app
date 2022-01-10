var bodyParser = require("body-parser");

var parser= bodyParser.urlencoded({ extended:false });
const mongoose = require('mongoose');

// ? connect to mangodb 
mongoose.connect("mongodb+srv://saidaitdriss:saidaitdriss1999@todos.wvzic.mongodb.net/todos?retryWrites=true&w=majority");

// create shema // like blueprint
var todoSchema = new mongoose.Schema({
    title : String,
    todo:String
});
// create model 
var Todo = mongoose.model("Todo",todoSchema); // like whene making object from class

module.exports = function (app){

    // for get todo
    app.get("/todo",function(req,res){
        
        // get data from mongodb and pass it to todo.ejs view by using Todo Model

        Todo.find({}, function (err, docs) {
            if(err) throw err;
            res.render("todo",{ todos:docs});

        });
    });


    // for get update 
    app.get("/update/:id",function(req,res){
        
        // get data from mongodb and pass it to todo.ejs view by using Todo Model

        Todo.find({ _id : req.params.id }, function (err, doc) {
            if(err) throw err;
            console.log(doc);
            res.render("update",{ todo:doc[0]});

        });
    });

    // for add todo
    app.post("/todo",parser,function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if(err) throw err;
            Todo.find({},function(err,data){
                if(err) throw err;
                res.render("todo",{todos:data});
            })
        });
    });



    // for delete todo
    app.delete("/todo/:id",function(req,res){

        Todo.find({ _id: req.params.id}).remove(function(err,data){
            if(err) throw err;
            Todo.find({},function(err,data){
                if(err) throw err;
                res.render("todo",{todos:data});
            })
        });
    });

     // for update todo
    app.post("/update-todo/:id",parser,function(req,res){
        
        // get data from mongodb and pass it to todo.ejs view by using Todo Model
        Todo.findById(req.params.id,function(err,p){
            if(!p){
                throw new err
            }else{
                p.title = req.body.title;
                p.todo = req.body.todo;

                p.save(function(err){
                    if(err)throw new err;
                    Todo.find({}, function (err, docs) {
                        if(err) throw err;
                        res.render("todo",{ todos:docs});
                    });
                });
            }
        })
        
    });
};