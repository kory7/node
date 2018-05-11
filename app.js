var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', (req,res)=>{
  res.send('Hello');
});
app.get('/login', (req,res)=>{
  res.send('Login please');
});
app.listen(3000, ()=>{
  console.log('Connected 3000 port!');
});
app.get('/router', (req,res)=>{
  res.send('Kakao <img src="kakao.png"/>');
})
