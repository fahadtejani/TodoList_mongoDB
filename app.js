//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item",itemsSchema);
//
const item1 = new Item({
  name:'Learn Coding.'
});

const item2 = new Item({
  name: 'Make food.'
});

const item3 = new Item({
  name: '<--- Press this button to delete item.'
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model('List', listSchema) ;


// Item.insertMany(defaultItems,(err)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Documents inserted');
//   }
// });



app.get("/", function(req, res) {

  Item.find({},(err,foundItems)=>{
    if (foundItems.length===0) {
      Item.insertMany(defaultItems,(err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Documents inserted');
        }
      });
      res.redirect('/');
    }
    else {
      res.render("list", {listTitle: 'Today', newListItems: foundItems});
    }
  });

});

app.post("/", function(req, res){

  const item = req.body.newItem;
  const listName = req.body.list;


  const userItem = new Item({
    name: item
  });

  if (listName === 'Today') {
    userItem.save();
    res.redirect('/');
    console.log('user input inserted!');
  } else {
    List.findOne({name: listName},(err,foundList)=>{
      foundList.items.push(item);
      foundList.save();
      res.redirect(`/${listName}`);
    });
  }
});

app.post('/delete',(req,res)=>{
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === 'Today'){
    console.log(checkedItemId);
    Item.findByIdAndRemove(checkedItemId,(err)=>{
      if (!err) {console.log(`Successfully deleted ${checkedItemId} from database`);
    res.redirect('/'); }
    });
  } else {
    List.findOneAndUpdate({name: listName},{$pull:{items:{_id:checkedItemId}}},(err,foundList)=>{
      if (!err){
        res.redirect('/'+listName);
      }
    });
  }
});

app.get("/:customListName", function(req,res){
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName},(err,foundList)=>{
    if(!err){
      if (!foundList) {
        const list = new List({
          name : customListName,
          items:defaultItems
        });
        list.save();
        res.redirect('/'+ customListName);

      } else {
        res.render("list",{listTitle:foundList.name, newListItems:foundList.items});
      }
    }
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
