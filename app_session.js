var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));//middleware
app.use(session({
  secret: 'jflasdkfjoqwe@!',
  resave: false,
  saveUninitialized: true
}));

app.get('/count',(req,res)=>{
  if(req.session.count){
    req.session.count++;
  } else{
    req.session.count = 1;
  }
  res.send('Count: ' + req.session.count);
});

app.get('/tmp', (req, res)=>{
  res.send('result : ' + req.session.count);
});

app.get('/welcome',(req,res)=>{
  if(req.session.displayName){
    res.send(`<h1>Hello,${req.session.displayName}</h1>
      <a href="/auth/logout">logout</a>`);
  }else{
    res.send(
      `
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `
    );
  }
});
app.get('/auth/logout', function(req,res){
  delete req.session.displayName;
  res.redirect('/welcome');
});
app.post('/auth/login', function(req, res){
  var user = {
    username:'jung',
    password:'123',
    displayName:'Jung'
  };

  var uname = req.body.username;
  var pwd = req.body.password;

  if(uname === user.username && pwd===user.password){
    req.session.displayName = user.displayName;// guarda en session
    res.redirect('/welcome');
  }else {
    res.send("Who are you? <a href='/auth/login'>Login</a>");
  }
});

app.get('/auth/login', function(req, res){
  var output = `
<h1>Login</h1>
  <form action="/auth/login" method="post">
    <p>
      <input type="text" name="username" placeholder="username">
    </p>
    <p>
    <input type="password" name="password" placeholder="password">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>`;

  res.send(output);
});

app.listen('3003',()=>{
  console.log('Connected 3003!');
});
