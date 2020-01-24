var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
   var campgrounds = [
       {name: "salmon1", image: "https://pixabay.com/get/54e5dd424856ae14f6da8c7dda793f7f1636dfe2564c704c722673d7914cc65c_340.jpg"},
       {name: "salmon2", image: "https://pixabay.com/get/54e2dd444f55ad14f6da8c7dda793f7f1636dfe2564c704c722673d7914cc65c_340.jpg"},
       {name: "salmon3", image: "https://pixabay.com/get/5ee0d44a4854b108f5d084609620367d1c3ed9e04e50744e7c2778d2964ec1_340.jpg"}
   ]
    res.render("campgrounds" ,{campgrounds: campgrounds});
});


app.listen(3000, function(){
    console.log("Yelp app started!");
});