var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var bodyParser = require("body-parser");
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.post('/api/submit/', function(req, res) {
    var fs = require('fs');
    writeExcel(req.body.state);
    sendExcel(req.body.state);
    res.status(201).json({ message: "Successfully Submitted"})
});

function deleteFile(path) {
    const fs = require('fs');
    fs.access(path, error => {
        if (!error) {
            fs.unlinkSync(path);
            console.log("File Deleted");
        } else {
            console.log(error);
        }
    });
}

function writeExcel(state) {
    var XlsxPopulate = require('xlsx-populate');
    XlsxPopulate.fromFileAsync("./form.xlsx")
        .then(workbook => {
            workbook.sheet("Sheet1").cell("B16").value(state.name);
            workbook.sheet("Sheet1").cell("L16").value(state.email);
            workbook.sheet("Sheet1").cell("L18").value(state.phone);
            workbook.sheet("Sheet1").cell("C18").value(state.street);
            workbook.sheet("Sheet1").cell("B20").value(state.city);
            workbook.sheet("Sheet1").cell("G20").value(state.state);
            workbook.sheet("Sheet1").cell("I20").value(state.zip);
            if(state.mail == true) {
                workbook.sheet("Sheet1").cell("B10").value("x");
            }
            else {
                workbook.sheet("Sheet1").cell("B12").value("x");
            }
            state.payments.forEach(function(payment) {
                var sheetCol = 33 + payment.key;
                workbook.sheet("Sheet1").cell("A" + sheetCol).value(parseInt(payment.quantity, 10));
                workbook.sheet("Sheet1").cell("B" + sheetCol).value(payment.item);
                workbook.sheet("Sheet1").cell("J" + sheetCol).value(parseFloat(payment.price));
            });
            return workbook.toFileAsync(state.name + "_prf.xlsx").then(console.log("File Created"));
        });
}

function sendExcel(state) {
    var nodemailer = require('nodemailer');

    // put account info of emailer here
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
            user: '',   
            pass: '' 
        }
    });

    // setup email data 
    let mailOptions = {
        from: '"Michael Tran" <michaeltran3599@gmail.com>',
        to: 'ssun098@gmail.com, erichadalittlelam@gmail.com',
        subject: 'SLO Hacks PRF Form - ' + state.name, 
        text: '',
        attachments: [
            {
                filename: state.name + '_prf.xlsx',
                path: './' + state.name + '_prf.xlsx'
            }
        ]
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        deleteFile("./" + state.name + '_prf.xlsx');
    })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var server = app.listen(8080, function() {
    console.log('Ready on port %d', server.address().port);
});
module.exports = app;
