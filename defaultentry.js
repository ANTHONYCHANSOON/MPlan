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


// const meal1 = new dailyMeal({
//     day: "Sunday",
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

//https://colorhunt.co/palette/2763

/* <a class="nav-item nav-link" href="#Monday">Monday</a>
            <a class="nav-item nav-link" href="#Tuesday">Tuesday</a>
            <a class="nav-item nav-link" href="#Wednesday">Wednesday</a>
            <a class="nav-item nav-link" href="#Thursday">Thursday</a>
            <a class="nav-item nav-link" href="#Friday">Friday</a>
            <a class="nav-item nav-link" href="#Saturday">Saturday</a>
            <a class="nav-item nav-link" href="#Sunday">Sunday</a> */

// const newinv = new Inventory({
//     name: "sample"
// })

// newinv.save();




/* <div class="text-center">
<% only5.forEach(function(eacharray){ %>
<div class="card text-center" style="width: 18rem;">
    <img src="<%= eacharray.thumbnail_url %>" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title colorblack"><%= eacharray.name %></h5>
        <p class="card-text colorblack">Some quick example text to build on the card title and make up the bulk
            of
            the card's
            content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
<% }) %>
</div> */


// <!-- <div>
// <% searchedquery.forEach(function(eachitem){ %>
// <h1>hello world</h1>
// <% }) %>
// </div> -->




<% searchedquery.forEach(function(item){ %>
    <ul>
        <li>name : <%= item.name %></li>
        <li><%= item.thumbnail_url%></li>
        <li>instructions :</li>
        <ol>
            item.insturctions.forEach(function(steps){
            <li>steps.name</li>
            })
        </ol>
    </ul>
    <%})%>