var express = require('express');
var router  = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

// INDEX - Show all campgrounds
router.get("/", function(req, res){
    Campground.find({},function (err, allCampgrounds){
        if (err){
            console.log("Oops, something went wrong searching for all campgrounds, ", err);
            req.flash("error", "Oops, something went wrong!");

        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
});

// CREATE - Add new campground to db
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: description, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log("Ooops, something went wrong creating new camp", err);
            req.flash("error", "Oops, something went wrong!");

        } else {
            res.redirect("/campgrounds");
        }
    })
});

// NEW - Show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// SHOW - Shows more info about specific campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if (err){
           req.flash("error", "Oops, something went wrong!");
           console.log(err);
       } else{
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Oops, something went wrong!");
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;