var data= [
    {
        id:1,
        title:"todo 1",
        todo :"walk dog"
    },
    {
        id:2,
        title:"todo 2",
        todo:"fix bugs"
    },
    {
        id:3,
        title:"todo 3",
        todo:"go to forest !"
    }
]

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

// save new todo
var item = Todo({ title:"tirst todo",todo:"buy cat hh" }).save(function(err){

    if(err) throw err;

    console.log("item saved");
});

module.exports = function (app){

    // for get todo
    app.get("/todo",function(req,res){
        const id = data.length > 0 ? data[data.length-1].id+1 : 0;
        res.render("todo",{ todos:data ,lastId: id });

    });

    // for add todo
    app.post("/todo",parser,function(req,res){
        data.push(req.body);
        const id = data.length > 0 ? data[data.length-1].id+1 : 0;
        res.render("todo",{todos:data,lastId:id });
    });

    // for delete todo
    app.delete("/todo/:id",function(req,res){

        data = data.filter(el => el.id != req.params.id );
        res.json(data);
    });
};