const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//custom middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile(`Server.log`, log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  })

  // console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

//custom middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //middleware

//middleware
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Ishan\'s Home',
    welcomeMessage: 'Welcome to my house!',
    // currentYear: new Date().getFullYear()
  });
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Ishan',
  //   likes: [
  //     'guitar',
  //     'node'
  //   ]
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Enable to handle request'
  });
})

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
