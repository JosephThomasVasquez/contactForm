
const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
 
const app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

app.get('/', (req, res) => {
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
    console.log('Server running on port:', 3000);
});