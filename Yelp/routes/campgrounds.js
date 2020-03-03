var express = require('express');
var router  = express.Router();
var Campground  = require("../models/campground");


// INDEX - Show all campgrounds
router.get("/", function(req, res){
    Campground.find({},function (err, allCampgrounds){
        if (err){
            console.log("Oops, something went wrong searching for all campgrounds, ", err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

// CREATE - Add new campground to db
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log("Ooops, something went wrong creating new camp");
        } else {
            console.log("New campground inserted: ", newlyCreated);
            res.redirect("/campgrounds");
        }
    })
});

// NEW - Show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - Shows more info about specific campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
           console.log(err);
       } else{
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

module.exports = router;