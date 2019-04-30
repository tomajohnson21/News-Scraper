$("#scrape").on("click", function(){
    
    $.ajax({
        type: "GET",
        url: "/api/scrape"}).then(function(){
            location.reload()
        })
})

$(document).on("click", ".save-article", function(){

    console.log("Article saved")

    let article_id = $(this).data("id")
    let url = "/api/save/" + article_id
    $.ajax({
        type: "PUT",
        url: url}).then(function(){
             location.reload()
         })
})