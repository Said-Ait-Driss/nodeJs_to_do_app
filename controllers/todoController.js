module.exports = function (app){

    // for get todo
    app.get("/todo",function(req,res){

        res.render("todo");

    });

    // for add todo
    app.post("/post",function(req,res){

    });

    // for delete todo
    app.delete("/post",function(req,res){

    });
};