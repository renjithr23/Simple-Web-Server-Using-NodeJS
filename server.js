var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials')

app.set('view_engine','hbs');

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log' , log + '\n', (err) => {
    if(err){
    console.log("Log cannot be entered");
    }
  });
  next();
});

// app.use((req,res,next) =>{
//   res.render('maintanence.hbs',{
//     pageTitle:'Maintanence Site'
//   });
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (textScream) =>{
  return textScream.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle:'Home',
    welcomeMessage:"Welcome to the Home Page",
  });
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:"Unable to handle request"
  });
});

app.listen(port, ()=>{
  console.log(`Server is up and running ${port}`);
});
