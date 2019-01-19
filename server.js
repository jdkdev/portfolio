const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require("fs")
const path = require('path')
const sass = require('node-sass')
const { exec } = require('child_process');

// Create Express App
const app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('dist'))
// FUNCTIONS
const l = (val) => console.log(val)

const lg = (val='nothing passed in') => {
	l(val)
	l(typeof val)
	if (typeof val === 'object') {
		Object.keys(val).forEach(i => lg(val[i]))
	} else {
		l(val.toString())
	}
	l('--------------------')
}

//
//app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //next();
//});
app.get('/', function(req, res) {
    lg(path.join(__dirname, 'index.html'))
    res.sendFile(path.join(__dirname, 'index.html'));
})


app.get('/test', function(req, res) {
    res.send('ok')
})

app.get('/convert', cors(), function(req, res) {
    scss = req.query.scss
    l(scss)
    result = sass.renderSync({ data: scss,
    }, (err) => console.log(err))

    res.json({css : result.css.toString().trim()})
    
})
app.get('/math', function(req, res) {
    inputs = req.query
    let answer = 0
    for (i in inputs) answer  += Number(inputs[i])
    l('hello')
    exec('npm run convert', (err, stdout, stderr) => {
      l(`stdout: ${stdout}`);
    });
    res.json({inputs, answer})
    
})



var server = app.listen(process.env.PORT || 3000, function() {console.log('********************** Server listening on port %s *', server.address().port);})
