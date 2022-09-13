const express= require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/bankDB", {useNewUrlParser: true});

const customerSchema = {
  title: String,
  email: String,
  balance: Number
};

const Customer = mongoose.model("Customer", customerSchema);

const customer1 = new Customer({
  title:"Sam",
  email:"sam2354@gmail.com",
  balance:23244
});

const customer2 = new Customer({
  title:"Chris",
  email:"chris8239@gmail.com",
  balance:43244
});

const customer3 = new Customer({
  title:"Roman",
  email:"romanreings@gmail.com",
  balance:993244
});

const customer4 = new Customer({
  title:"Derek",
  email:"derek22234@gmail.com",
  balance:1244
});

const customer5 = new Customer({
  title:"Colon",
  email:"colonjod@gmail.com",
  balance:7244
});

const customer6 = new Customer({
  title:"Gordon",
  email:"gordonramsay@gmail.com",
  balance:673244
});

const customer7 = new Customer({
  title:"Zack",
  email:"zackgamer@gmail.com",
  balance:83244
});

const customer8 = new Customer({
  title:"Robert",
  email:"robertdown@gmail.com",
  balance:987254
});

const customer9 = new Customer({
  title:"Bella",
  email:"bellacio@gmail.com",
  balance:33244
});

const customer10 = new Customer({
  title:"Jeremy",
  email:"jeremysec4@gmail.com",
  balance:56453
});

const defaultItems = [customer1,customer2,customer3,customer4,customer5,customer6,customer7,customer8,customer9,customer10];

Customer.insertMany(defaultItems,function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Sucessfully added customers to the database");
  }
});

app.get("/",function(req,res){
  res.render("main");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.get("/contact",function(req,res){
  res.render("contact");
});

app.get("/customers",function(req,res){
  res.render("customers",{customers:defaultItems});
});

app.get("/customers/:customerName",function(req,res){
  const reqcustomer = req.params.customerName;
for (var i = 0; i < defaultItems.length; i++) {
  if(defaultItems[i].title === reqcustomer){
    res.render("customer",{title:defaultItems[i].title,email:defaultItems[i].email,balance:defaultItems[i].balance});
  }
}

});

app.post("/customers",function(req,res){
  const sender= req.body.sender;
  const money= req.body.money;
  console.log(sender);
  console.log(money);
  for (var i = 0; i < defaultItems.length; i++) {
    if(defaultItems[i].title === sender){
      defaultItems[i].balance=defaultItems[i].balance-money;
      res.render("send",{customers:defaultItems,sender:defaultItems[i],money:money});
    }
  }
  // res.render("customers",{customers:defaultItems});
});

app.post("/send",function(req,res){
const reciever=req.body.reciever;
const money= req.body.money;
console.log(reciever);
console.log(money);
for (var i = 0; i < defaultItems.length; i++) {
  if(defaultItems[i].title === reciever){
    defaultItems[i].balance=defaultItems[i].balance+Number(money);
      res.render("customers",{customers:defaultItems});
  }
}
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
