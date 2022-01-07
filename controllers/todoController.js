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