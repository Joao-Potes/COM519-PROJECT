const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const mongo = require("./mongo");
var MongoClient = require('mongodb').MongoClient;
const schema = require("./schemas/items_schema");
const bodyParser = require("body-parser");
const { assert } = require("console");


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))


//Connect to the Database
const connectDB = async () => {
  await mongo().then(async (mongoose) =>{
    try{
      console.log("Successfuly Connected to DB")
    }catch{
      console.log("Error Connecting to DB")
    }
    
  })
};

database = connectDB();

//gets
app.get("/", (req, res) => {
  schema.find({}, function(err, items){
    res.render("index", {
      items_list: items
    })
  })
});

app.get("/add_item", (req, res) => {
  res.render("add_item");
});

app.get("/delete", (req, res) => {
  schema.find({}, function(err, items){
    res.render("delete", {
      items_list: items
    })
  })
  });

app.get("/update-item", (req, res) => {
  schema.find({}, function(err, items){
    res.render("update-item", {
      items_list: items
    })
  })
});

//Posts
//Add
app.post("/add_item", function(req,res){
  let newItem = new schema({
    item_name : req.body.item_name,
    item_price: req.body.item_price,
    quantity : req.body.quantity,
    shop : req.body.shop
  })
  newItem.save();
  res.redirect("/");
})
//Update
app.post("/update-item", async function(req,res){
  await mongo().then(async (mongoose) =>{
    try{
      await schema.updateOne({
        item_name : req.body.item_name
      },{
        item_price: req.body.item_price,
        quantity : req.body.quantity,
        shop : req.body.shop
      })
    }catch{
      console.log("Error Connecting to DB")
    }
  })
  res.redirect("/")
})
//Delete
app.post("/delete_item", async function(req,res){
  await mongo().then(async (mongoose) =>{
    try{
      await schema.deleteOne({
        room : req.body.room
      })
    }catch{
      console.log("Error Connecting to DB")
    }
  })
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});