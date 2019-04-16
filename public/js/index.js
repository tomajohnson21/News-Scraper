$("#scrape").on("click", function(){
    
    console.log("Click!")
    
    $.ajax({
        type: "GET",
        url: "/api/scrape"}).then(function(){
            //location.reload()
        })
})