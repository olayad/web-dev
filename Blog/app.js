var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true,
     useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// MONGOOSE MODEL/CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose. model("Blog", blogSchema);


// Blog.create({
//     title: "Test1",
//     image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
//     body: "Hi this is Bitcorn"
// });

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.listen(3000, function(){
    console.log("Blog server is running!");
});