const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json);

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(res);
  res.render("contact");
});

// Posts to the /send URL with the form data
app.post("/send", (req, res) => {
  console.log(req.body);

  const output = `
  <p>You have a new email from: ${req.body.email}</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message:</h3>
    <p>${req.body.message}</p>`;


    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodeMailer.createTestAccount();
      
        // create reusable transporter object using the default SMTP transport
        let transporter = nodeMailer.createTransport({
          host: "smtp.ionos.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'test@joetvasquez.com', // generated ethereal user
            pass: '$$M0neyzDude' // generated ethereal password
          }
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Nodemailer Contact" <test@joetvasquez.com>', // sender address
          to: "joetv.tech@gmail.com", // list of receivers
          subject: "Node Contact Request", // Subject line
          text: "Hello world?", // plain text body
          html: output // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));

        res.render('contact', {message: 'Email has been sent!'});
        
      }
      
      main().catch(console.error);
});

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server running on port:", port);
});
