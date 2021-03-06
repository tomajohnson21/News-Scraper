var db = require("../models");

module.exports = function(app) {

    app.get("/", function(req, res){
        
        db.Article.find({}).then(articles => {
            
            hbObj = {data: articles}
            
            res.render("index", hbObj)
        }).catch(err => console.log(err));
    })

    app.get("/saved", function(req, res){
        
        db.Article.find({saved: true}).then(articles => {

            hbObj = {data: articles}

            res.render("saved", hbObj)
        }).catch(err => console.log(err));
    })
}