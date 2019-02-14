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

app.get('/', function(req, res) {
    lg(path.join(__dirname, 'app/index.html'))
    res.sendFile(path.join(__dirname, 'app/index.html'));
})


app.get('/slideshow', function(req, res) {
    fs.readdir('./dist/assets/slideshow', (err, files) => {
        let fileList = []
        for (file of files) {
            fileList.push('assets/slideshow/' + file)
        }
        console.log(fileList)
        res.send(fileList)
    })
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

var server = app.listen(process.env.PORT || 5000, function() {console.log('********************** Server listening on port %s *', server.address().port);})
