
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
 
const app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json);

app.use(express.static('public'));

app.get('/', (req, res) => {

    console.log(res);
    res.render('contact');

});

app.post('/send', (req, res) => {

    console.log(req.body);

});
 
let port = process.env.PORT;

if (port == null || port == '') {
    port = 3000;
};

app.listen(port, () => {
    console.log('Server running on port:', port);
});