var cheerio = require("cheerio");
var axios = require("axios");

var db = require("../models");



module.exports = function (app) {
    // Scraper API.
    app.get("/api/scrape", function (req, res) {
        
        axios.get("https://www.theonion.com/").then(function(response) {

            const $ = cheerio.load(response.data);

            let results = [];

            $("article.postlist__item").each(function(i, element) {

                let article = {};

                //console.log(element);

                article.title = $(element)
                    .find('h1.headline')
                    .text();

                article.img = $(element)
                    .find('.img-wrapper picture')
                    .children()
                    .first()
                    .attr('data-srcset');

                article.link = $(element)
                    .find('a.js_entry-link')
                    .attr('href');  

                article.excerpt = $(element)
                    .find('.excerpt')
                    .first()
                    .text();


                results.push(article);
                
                db.Article.find({ "title": article.title }, (err, result) => {
                    if (!result.length) {
                        db.Article.create(article).then(article => console.log(article)).catch(err => console.log(err));
                    }
                })
            });

            res.json(results);
        });
        // });


    });

    // Remove everything in Article collection
    app.post("/api/clear", function (req, res) {
        db.Article.remove({saved: false}, function (results) { 
            res.json(results)
        })
    })

    // save article
    app.put("/api/save/:id", function (req, res) {
        // console.log(request.body);
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true }).then(results => res.json(results)).catch(err => res.json(err))
    });
    // UNsave article
    app.put("/api/unsave/:id", function (req, res) {
        // console.log(request.body);
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false }).then(results => res.json(results)).catch(err => res.json(err))
    });

    app.post("/api/notes", function (req, res) {
        const id = req.body.id;
        db.Article.findOne({ _id: id }).populate("note").then(article => {
            res.json(article);
        }).catch(err => res.json(err))
    });

    // Add Article Notes
    app.put("/api/:id/add-note", function (req, res) {
        console.log(req.body);
        // create Note and link with article id
        db.Note.create(req.body).then(note => {
            console.log("addNote: ", addNote);
            req.body["note"] = addNote._id;
            console.log("request.body: ", req.body);
                return (
                    db.Article.findOneAndUpdate(
                        { _id: req.params.id },
                        { $push: { note: addNote._id } },
                        { new: true }
                    )
                )
        }).then(singleArticle => res.json(singleArticle)).catch(err => res.json(err));

    })

    // Delete Note
    app.delete("/api/remove-note/:id", function (req, res) {
        console.log("DELETE NOTE: ", req.params.id );
        db.Note.remove({_id: req.params.id },
        function(error, removed) {
            if (error) {
                console.log("Delete Note Error: ", error);
                res.json(error);
            } else {
                res.json(removed);
            }
        })
    });
}