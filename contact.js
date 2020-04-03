
var express = require('express');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
 
app.get('/', (req, res) => {
    res.render('contact');
});
 
let port = process.env.PORT;

if (port == null || port == '') {
    port = 3000;
};

app.listen(port, () => {
    console.log('Server running on port: 3000');
});