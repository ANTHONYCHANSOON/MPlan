const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const unirest = require("unirest");

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// mongoose.connect("mongodb://localhost:27017/mPlanDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connect("mongodb+srv://admin-anthony:Test123@cluster0-jxcje.mongodb.net/mPlanDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const inventorySchema = {
    name: String
}

const Inventory = mongoose.model("inventory", inventorySchema);

const dailymealSchema = {
    day: String,
    mealForTheDay: {
        breakfast: {
            name: String,
            recipe: String,
            link: String,
            video: String
        },
        lunch: {
            name: String,
            recipe: String,
            link: String,
            video: String
        },
        dinner: {
            name: String,
            recipe: String,
            link: String,
            video: String
        }
    }
}

const dailyMeal = mongoose.model("meal", dailymealSchema);

app.get("/", function (req, res) {

    Inventory.find({}, function (err, inventorydata) {
        if (!err) {
            dailyMeal.find({}, function (err, mealdata) {
                if (!err) {
                    //console.log(mealdata);
                    //console.log(mealdata[0].mealForTheDay.breakfast);
                    res.render("home", {
                        user: "Anthony",
                        inventorydata: inventorydata,
                        mealdata: mealdata
                    })
                }
            })
        }
    })
})

app.get("/specificmeal/:specificday", function (req, res) {
    //console.log(req.params.specificday);
    const requestedDay = req.params.specificday;

    dailyMeal.findOne({ day: requestedDay }, function (err, data) {
        if (!err) {
            //console.log(data);
            res.render("piece", {
                day: requestedDay,
                specificdata: data
            })
        }
    })
})



app.get("/api", function (req, res) {

    let apipull = {};
    let only5 = [];

    async function retrieveAPI() {
        var reqtas = unirest("GET", "https://tasty.p.rapidapi.com/recipes/list");
        reqtas.query({
            "tags": "under_30_minutes",
            "from": "0",
            "sizes": "80"
        })
        reqtas.headers({
            "x-rapidapi-host": "tasty.p.rapidapi.com",
            "x-rapidapi-key": "b98198b437mshea0ca9221f948fdp104f05jsneed7015c919a",
            "useQueryString": true
        });
        reqtas.end(function (res) {
            if (res.error) throw new Error(res.error);
            apipull = res.body.results

            for (let i = 0; i < 20; i++) {
                only5.push(apipull[i]);
            }
        });
    }

    async function executePage() {
        await retrieveAPI();
        setTimeout(() => {
            res.render("api", {
                only5: only5
            })
        }, 3000);
    }
    executePage();
})

app.get("/inventory", function (req, res) {
    Inventory.find({}, function (err, data) {
        console.log(data);
        if (!err) {
            res.render("inventory", {
                data: data
            });
        }
    })
})

app.post("/updatemeal/:specificday", function (req, res) {
    const daytobeupdated = req.params.specificday;
    console.log(daytobeupdated);
    const bname = req.body.bname;
    const bingredient = req.body.bingredient;
    const blink = req.body.blink;
    const bvideo = req.body.bvideo;
    console.log(bname, bingredient, blink, bvideo)

    const lname = req.body.lname;
    const lingredient = req.body.lingredient;
    const llink = req.body.llink;
    const lvideo = req.body.lvideo;
    console.log(lname, lingredient, llink, lvideo);

    const dname = req.body.dname;
    const dingredient = req.body.dingredient;
    const dlink = req.body.dlink;
    const dvideo = req.body.dvideo;
    console.log(dname, dingredient, dlink, dvideo);

    let newobj = {
        breakfast: {
            name: bname,
            recipe: bingredient,
            link: blink,
            video: bvideo
        },
        lunch: {
            name: lname,
            recipe: lingredient,
            link: llink,
            video: lvideo
        },
        dinner: {
            name: dname,
            recipe: dingredient,
            link: dlink,
            video: dvideo
        }
    }

    dailyMeal.findOneAndUpdate({ day: daytobeupdated }, { mealForTheDay: newobj }, function (err) {
        if (!err) {
            console.log("success");
            res.redirect("/specificmeal/" + daytobeupdated);
        }
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started on port = " + port);
})