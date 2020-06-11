const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const app = express();
var posts = [];

const HomeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate ligula lorem, non eleifend diam luctus nec. Nunc ac sodales mi. Maecenas pretium nunc enim, et ullamcorper tortor consectetur nec. Donec pharetra justo eu luctus sollicitudin. Curabitur eget orci commodo, condimentum tortor eget, viverra justo. Duis auctor venenatis rutrum. Cras tempor tempor erat et pellentesque. Ut vel sem risus. Nam et facilisis enim. Praesent vel finibus nisi.";
const ContactContent = "Podes contactarme en mi gmail 22.javier.fernandez@gmail.com, en mi perfil de LinkedIn o en mi twitter";
const AboutContent = "Hola soy un desarrollador de software. Actualmente vivo en trelew, argentina";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extender: true }));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home.ejs", {content: HomeContent, posts: posts});
});

app.get("/about", function(req, res){
    res.render("about.ejs", {content: AboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact.ejs", {content: ContactContent});
});

app.get("/compose", function(req, res){
    res.render("compose.ejs");
});

app.get('/post/:title', function (req, res) {
    const requestedTitle = lodash.lowerCase(req.params.title);
    posts.forEach(post => {
        const postedTitle = lodash.lowerCase(post.title);
        if (requestedTitle ===  postedTitle) {
            res.render("post.ejs", 
            {
                post: post

            });
        };
    });
});

app.post("/compose", function(req,res){
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;

    const post = {
        title: postTitle,
        content: postContent
    };

    posts.push(post);

    res.redirect("/");
    
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});