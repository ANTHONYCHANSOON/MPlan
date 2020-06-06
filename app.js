const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/mPlanDB", { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/", function(req, res) {
    res.render("home", {
        name : "Anthony",
        title1 : "Title 1",
        title2 : "Title 2"
    })
})


let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("Server started on port = " + port);
})