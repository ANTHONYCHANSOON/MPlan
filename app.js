const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/mPlanDB", { useNewUrlParser: true, useUnifiedTopology: true })

const inventorySchema = {
    name: String
}

const Inventory = mongoose.model("inventory", inventorySchema);

//delete default items
// const item1 = new Inventory ({
//     name : "Ribeye Steak(default-delete after)"
// })
// const item2 = new Inventory({
//     name : "Butter(default - delete after)"
// })

// Inventory.insertMany([item1,item2], function(err){
//     if(!err) {
//         console.log("default items were added");
//     }
// })

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

// const meal1 = new dailyMeal({
//     day: "Monday",
//     mealForTheDay: {
//         breakfast: {
//             name: "Omelet",
//             recipe: "Egg, Ham, Cheese",
//             link: "https://www.incredibleegg.org/recipe/basic-french-omelet/",
//             video: "https://youtu.be/qXPhVYpQLPA"
//         },
//         lunch: {
//             name: "KFC",
//             recipe: "Secret Recipe",
//             link: "Nearest KFC",
//             video: ""
//         },
//         dinner: {
//             name: "Steak",
//             recipe: "Ribeye, Butter, Herbs",
//             link: "",
//             video: "https://www.youtube.com/watch?v=RVCyeX7AWpE"
//         }
//     }
// });
// meal1.save();

app.get("/", function (req, res) {

    Inventory.find({}, function (err, inventorydata) {
        if (!err) {
            dailyMeal.find({}, function(err, mealdata) {
                if (!err){
                    console.log(mealdata);
                    console.log(mealdata[0].mealForTheDay.breakfast);
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


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("Server started on port = " + port);
})