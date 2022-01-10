$(document).ready(function(){

        $("#form").submit(function(e){
            e.preventDefault();
            const title = $("#title").val();
            const todo = $("#todo").val();
            $.ajax({
                url: "/todo/",
                type:"post",
                data:{
                    title : title,
                    todo : todo
                },
                success: function(result){
                    console.log(result);
                    window.location.reload();
                }
            }
            );
        });

        // update form
        // $("#updateForm").submit(function(e){
        //     e.preventDefault();
        //     const title = $("#title").val();
        //     const todo = $("#todo").val();
        //     const _id = $("#_id").val();
        //     $.ajax({
        //         url: "/update-todo/"+_id,
        //         type:"post",
        //         data:{
        //             title : title,
        //             todo : todo
        //         },
        //         success: function(result){
        //             console.log(result);
        //             window.location.replace("/todo");
        //         }
        //     }
        //     );
        // });

    $(".delete-btn").each(function(i,element ){
        $(element).click(function(){
            const id = $(element).data("id");
            $.ajax({
                url: "/todo/"+id,
                type:"delete",
                success: function(result){
                    console.log(result);
                    window.location.reload();
                }
            }
            );
        });
    });

}); 