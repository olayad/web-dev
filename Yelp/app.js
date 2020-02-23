var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
;

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true,
     useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




// Campground.create({
//     name: "Parksville",
//     image: "https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixlib=rb-1.2.1",
//     description: "Great bathrooms, great service"
// }, function(err, campground){
//     if (err){
//         console.log("Error while inserting campground to db");
//     } else {
//         console.log("New campground inserted: ", campground);
//     }
// });
//

// var campgrounds = [
//    {name: "Tofino", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"},
//    {name: "Parksville", image: "https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixlib=rb-1.2.1"},
//    {name: "Cape Scott", image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b"},
//    {name: "Tofino1", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1"},
//    {name: "Parksville1", image: "https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixlib=rb-1.2.1"},
//    {name: "Cape Scott1", image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b"}
// ];

// INDEX
app.get("/", function(req, res){
    res.render("landing");
});


// Show all campgrounds
app.get("/index", function(req, res){
    Campground.find({},function (err, allCampgrounds){
        if (err){
            console.log("Oops, something went wrong searching for all campgrounds, ", err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - Add new campground to db
app.post("/index", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    Campground.create(newCampground, function(err, newlyCreated){
        if (err){
            console.log("Ooops, something went wrong creating new camp");
        } else {
            console.log("New campground inserted: ", newlyCreated);
            res.redirect("index");
        }
    })
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - Shows more info about specific campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err){
           console.log(err);
       } else{
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(3000, function(){
    console.log("Yelp app started!");
});