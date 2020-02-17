var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true,
     useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// methodOverride is needed for the form (edit.ejs), to send a PUT request when editing post
app.use(methodOverride("_method"));
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
//     title: "Post1",
//     image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
//     body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci architecto aspernatur blanditiis deserunt dolorem eaque id impedit, incidunt laudantium nesciunt nobis, perspiciatis quae quia sequi similique sint, voluptatem voluptates! Consequuntur, dolorem dolorum, eaque earum, eligendi error fugiat itaque modi odio odit officiis praesentium quidem quod recusandae suscipit ut vero voluptatum?"
// });

//RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/blogs");
});

// Index - Show all blogs
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.post("/blogs", function(req, res){
    Blog.create(req.body.blog, function(err, newPost){
        if (err){
            console.log("Ooops, something went wrong creating new post");
        } else {
            console.log("New blog post inserted.");
            res.redirect("/blogs");
        }
    })
});


app.get("/blogs/new", function(req, res){
    res.render("new");
});


app.get("/blogs/:id", function(req, res){
    // console.log("req.params", req.params);
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log("Ooops, an error ocurred");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            console.log("Error happened");
        } else {
            res.render("edit", {blog: foundBlog})
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/blogs");
        } else {
            console.log("here (updated)", updatedBlog);
            res.redirect("/blogs/" + req.params.id)
        }
    });
});




app.listen(3000, function(){
    console.log("Blog server is running!");
});