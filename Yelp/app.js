var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
   {name: "Tofino", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9"},
   {name: "Parksville", image: "https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixlib=rb-1.2.1"},
   {name: "Cape Scott", image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b"},
   {name: "Tofino1", image: "https://images.unsplash.com/photo-1497900304864-273dfb3aae33?ixlib=rb-1.2.1"},
   {name: "Parksville1", image: "https://images.unsplash.com/photo-1542332213-1d277bf3d6c6?ixlib=rb-1.2.1"},
   {name: "Cape Scott1", image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b"}
];


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds" ,{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.render("campgrounds" ,{campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.listen(3000, function(){
    console.log("Yelp app started!");
});