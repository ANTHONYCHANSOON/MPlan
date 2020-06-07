const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//mongoose.connect("mongodb://localhost:27017/mPlanDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
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

const meal1 = new dailyMeal({
    day: "Sunday",
    mealForTheDay: {
        breakfast: {
            name: "Omelet",
            recipe: "Egg, Ham, Cheese",
            link: "https://www.incredibleegg.org/recipe/basic-french-omelet/",
            video: "https://youtu.be/qXPhVYpQLPA"
        },
        lunch: {
            name: "KFC",
            recipe: "Secret Recipe",
            link: "Nearest KFC",
            video: ""
        },
        dinner: {
            name: "Steak",
            recipe: "Ribeye, Butter, Herbs",
            link: "",
            video: "https://www.youtube.com/watch?v=RVCyeX7AWpE"
        }
    }
});
meal1.save();

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