var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('fdsfoopgkdpfogkwerjfsadf'));

var products ={
  1:{title:"Javascript server side"},
  2:{title:"The next ecmascript"}
};

app.get('/cart/:id', (req,res)=>{
  var id = req.params.id;
  if(req.cookies.cart) {
    var cart = req.cookies.cart;
  }else{
    var cart = {};
  }
  if(!cart[id]){
    cart[id]=0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  res.cookie('cart',  cart, {signed:true});
  res.redirect('/cart');
});

app.get('/cart', (req,res)=>{
  var cart = req.signedCookies.cart;
  if(!cart){
    res.send('Empty!');
  }else{
    var output = '';
    for(var id in cart){
      output += `<li>${products[id].title} (${cart[id]})</li>`;
    }
  }
  res.send(`<h1>Cart</h1><ul>${output}</ul><a href="/products">Products</a>`);
});

app.get('/products', (req,res)=>{
  var output = '';
  for(var name in products){
    output += `<li>
    <a href="/cart/${name}">${products[name].title}</a>
    </li>`;
  }
  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

app.listen('3003', ()=>{
  console.log("Starting server at port 3003");
});
